import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GruposService } from 'src/app/grupos/shared/grupos.service';

import { Cliente } from 'src/app/clientes/shared/Cliente';
import { Grupo } from 'src/app/grupos/shared/Grupo';
import { ClientesService } from '../shared/clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss'],
})
export class ClientesFormComponent implements OnInit {
  clientes: Cliente[];
  grupos: Grupo[];
  cliente: Cliente;
  form: FormGroup;
  title: string;
  salvarTexto: string;
  err: any;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private grupoService: GruposService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.salvarTexto = 'Salvar';

    //grupos
    let grupos$ = this.grupoService.getGrupos().pipe(
      catchError((error) => {
        console.error(error);
        this.err = 'Falha ao atualizar o cliente';
        return EMPTY;
      })
    );
    grupos$.forEach((grupos) => (this.grupos = grupos));

    //clientes recebido
    this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    if (history.state.cliente) {
      this.cliente = history.state.cliente;
      this.title = 'Editar Cliente';
    } else {
      this.cliente = new Cliente();
      this.title = 'Novo Cliente';
    }

    this.clientes = history.state.clientes;
    this.configForm();
  }

  configForm() {
    this.form = this.formBuilder.group({
      nome: [this.cliente.nome, [Validators.required, Validators.minLength(3)]],
      cpf: [
        this.cliente.cpf,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      telefone: [
        this.cliente.telefone,
        [
          Validators.minLength(10),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      grupoId: [this.cliente.grupoId, Validators.required],
      ativo: this.cliente.ativo,
    });
  }
  async onSubmit() {
    this.salvarTexto = 'carregando...';
    const form: Cliente = this.form.value;

    this.cliente = {
      ...this.cliente,
      ...form,
    };

    if (await this.checkClienteExist(this.cliente)) {
      return;
    }

    if (this.cliente.clienteId) {
      this.clienteService
        .updateCliente(this.cliente)
        .pipe(
          catchError((error) => {
            console.error(error);
            this.err = 'Falha ao atualizar o cliente';
            return EMPTY;
          })
        )
        .toPromise()
        .then(() => this.voltarClicked());
    } else {
      this.clienteService
        .createCliente(this.cliente)
        .pipe(
          catchError((error) => {
            console.error(error);
            this.err = 'Falha ao criar o cliente';
            return EMPTY;
          })
        )
        .toPromise()
        .then(() => this.voltarClicked());
    }
  }

  async checkClienteExist(cliente: Cliente) {
    const clientes = await this.clienteService.getClientes().toPromise();
    const _cliente = clientes.find((c) => c.cpf == cliente.cpf);

    if (_cliente && _cliente.clienteId != cliente.clienteId) {
      this.salvarTexto = 'Já CPF em uso existe';
      setTimeout(() => (this.salvarTexto = 'Salvar'), 3000);
      return true;
    } else {
      return false;
    }
  }

  voltarClicked() {
    this.router.navigateByUrl('/clientes');
  }
}