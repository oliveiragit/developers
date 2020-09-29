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
  clienteSelecionado: Cliente;
  formulario: FormGroup;
  title: string;
  salvarTexto: string;
  grupos$: Observable<Grupo[]>;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClientesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private grupoService: GruposService
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
      this.clienteSelecionado = history.state.cliente;
      this.title = 'Editar Cliente';
    } else {
      this.clienteSelecionado = new Cliente();
      this.title = 'Novo Cliente';
    }
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: [
        this.clienteSelecionado.nome,
        [Validators.required, Validators.minLength(3)],
      ],
      cpf: [
        this.clienteSelecionado.cpf,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      telefone: [
        this.clienteSelecionado.telefone,
        [
          Validators.minLength(10),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      grupoId: [this.clienteSelecionado.grupoId, Validators.required],
      ativo: [this.clienteSelecionado.ativo, Validators.required],
    });
  }
  onSubmit() {
    this.salvarTexto = 'carregando...';
    const form = this.formulario.value;

    this.clienteSelecionado = {
      ...this.clienteSelecionado,
      ...form,
    };
    if (this.clienteSelecionado.clienteId) {
      this.cliente$ = this.clienteService
        .updateCliente(this.clienteSelecionado)
        .pipe(
          catchError((error) => {
            console.error(error);
            this.err = 'Falha ao atualizar o cliente';
            return EMPTY;
          })
        );
    } else {
      this.cliente$ = this.clienteService
        .createCliente(this.clienteSelecionado)
        .pipe(
          catchError((error) => {
            console.error(error);
            this.err = 'Falha ao criar o cliente';
            return EMPTY;
          })
        );
    }
    this.cliente$.subscribe((t) => this.voltarClicked());
  }

  voltarClicked() {
    this.router.navigateByUrl('/clientes');
  }
}
