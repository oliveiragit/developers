import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY, PartialObserver } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GruposService } from 'src/app/grupos/grupos.service';

import { Cliente } from 'src/app/models/Cliente';
import { Grupo } from 'src/app/models/Grupo';
import { ClientesService } from '../clientes.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit {
  state$: Observable<object>;
  cliente$: Observable<Cliente>;
  err: any;
  cliente: Cliente;
  form: FormGroup;
  title: string;
  salvarTexto: string;
  grupos$: Observable<Grupo[]>;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private grupoService: GruposService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.salvarTexto = 'Salvar';

    this.grupos$ = this.grupoService.getGrupos().pipe(
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );

    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    if (history.state.cliente) {
      this.cliente = history.state.cliente;
      this.title = 'Editar Cliente';
    } else {
      this.cliente = new Cliente();
      this.title = 'Novo Cliente';
    }
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

    if (await this.checkClienteExist(this.cliente)) {
      return;
    }

    this.cliente = {
      ...this.cliente,
      ...form,
    };
    if (this.cliente.clienteId) {
      this.cliente$ = this.clienteService.updateCliente(this.cliente).pipe(
        catchError((error) => {
          console.error(error);
          this.err = 'Falha ao atualizar o cliente';
          return EMPTY;
        })
      );
    } else {
      this.cliente$ = this.clienteService.createCliente(this.cliente).pipe(
        catchError((error) => {
          console.error(error);
          this.err = 'Falha ao criar o cliente';
          return EMPTY;
        })
      );
    }
    this.cliente$.subscribe((t) => this.voltarClicked());
  }

  async checkClienteExist(cliente: Cliente) {
    const cliente$ = await this.clienteService.getClientes().toPromise();
    const _cliente = cliente$.find((c) => c.cpf == cliente.cpf);
    if (_cliente && _cliente.clienteId != cliente.clienteId) {
      this.salvarTexto = 'Já existe';
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
