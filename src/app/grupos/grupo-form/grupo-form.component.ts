import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Grupo } from 'src/app/models/Grupo';
import { GruposService } from '../grupos.service';

@Component({
  selector: 'app-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss'],
})
export class GrupoFormComponent implements OnInit {
  grupos: Observable<Grupo[]>;
  grupoSelecionado: Grupo;
  formulario: FormGroup;
  grupoId: number;
  state$: Observable<object>;

  constructor(
    private formBuilder: FormBuilder,
    private grupoService: GruposService,
    public activatedRoute: ActivatedRoute
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
        this.grupoSelecionado.grupoId,
        [Validators.required, Validators.min(3)],
      ],
      ativo: [this.grupoSelecionado.ativo, Validators.required],
    });
  }

  criar() {
    console.log(this.formulario.value);
  }
}
