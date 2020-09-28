import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Grupo } from 'src/app/models/Grupo';
import { GruposService } from '../grupos.service';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss'],
})
export class GrupoFormComponent implements OnInit {
  grupos$: Observable<Grupo[]>;
  state$: Observable<object>;
  obs$: any;
  err: any;
  grupoSelecionado: Grupo;
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private grupoService: GruposService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    if (history.state.grupo) {
      this.grupoSelecionado = history.state.grupo;
    } else {
      this.grupoSelecionado = new Grupo();
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
    const form = this.formulario.value;
    let grupo$: Observable<Grupo>;

    this.grupoSelecionado = {
      ...this.grupoSelecionado,
      ...form,
    };
    if (this.grupoSelecionado.grupoId) {
      grupo$ = this.grupoService.updateGrupo(this.grupoSelecionado).pipe(
        catchError((error) => {
          console.error(error);
          this.err = 'Falha ao atualizar o grupo';
          return EMPTY;
        })
      );
    } else {
      grupo$ = this.grupoService.createGrupo(this.grupoSelecionado).pipe(
        catchError((error) => {
          console.error(error);
          this.err = 'Falha ao criar o grupo';
          return EMPTY;
        })
      );
    }
    grupo$.subscribe({ next: this.obs$ });
    // if (!this.err) {
    //   this.router.navigateByUrl('/grupos');
    // }
  }
}
