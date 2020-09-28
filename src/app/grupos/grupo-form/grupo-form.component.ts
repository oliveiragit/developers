import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY, PartialObserver } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Grupo } from 'src/app/models/Grupo';
import { GruposService } from '../grupos.service';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss'],
})
export class GrupoFormComponent implements OnInit {
  state$: Observable<object>;
  grupo$: Observable<Grupo>;
  err: any;
  grupoSelecionado: Grupo;
  formulario: FormGroup;
  title: string;
  salvarTexto: string;

  constructor(
    private formBuilder: FormBuilder,
    private grupoService: GruposService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.salvarTexto = 'Salvar'
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    if (history.state.grupo) {
      this.grupoSelecionado = history.state.grupo;
      this.title = 'Editar Grupo';
    } else {
      this.grupoSelecionado = new Grupo();
      this.title = 'Novo Grupo';
    }
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: [
        this.grupoSelecionado.nome,
        [Validators.required, Validators.min(3)],
      ],
      ativo: [this.grupoSelecionado.ativo, Validators.required],
    });
  }
  onSubmit() {
    this.salvarTexto = 'carregando...';
    const form = this.formulario.value;

    this.grupoSelecionado = {
      ...this.grupoSelecionado,
      ...form,
    };
    if (this.grupoSelecionado.grupoId) {
      this.grupo$ = this.grupoService.updateGrupo(this.grupoSelecionado).pipe(
        catchError((error) => {
          console.error(error);
          this.err = 'Falha ao atualizar o grupo';
          return EMPTY;
        })
      );
    } else {
      this.grupo$ = this.grupoService.createGrupo(this.grupoSelecionado).pipe(
        catchError((error) => {
          console.error(error);
          this.err = 'Falha ao criar o grupo';
          return EMPTY;
        })
      );
    }
    this.grupo$.subscribe((t) => this.voltarClicked());
  }

  voltarClicked() {
    this.router.navigateByUrl('/grupos');
  }
}
