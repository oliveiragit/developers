import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Check } from 'angular-feather/icons';
import { Observable, EMPTY, PartialObserver } from 'rxjs';
import { map, catchError, filter, find } from 'rxjs/operators';

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

  grupos: Observable<Grupo[]>;
  grupoSelecionado: Grupo;

  formulario: FormGroup;
  title: string;

  salvarTexto: string;
  obs$: any;
  err: any;
  constructor(
    private formBuilder: FormBuilder,
    private grupoService: GruposService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.salvarTexto = 'Salvar';
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
        [Validators.required, Validators.minLength(3)],
      ],
      ativo: [this.grupoSelecionado.ativo, Validators.required],
    });
  }
  async onSubmit() {
    this.salvarTexto = 'carregando...';

    const form = this.formulario.value;

    this.grupoSelecionado = {
      ...this.grupoSelecionado,
      ...form,
    };

    if (await this.checkGroupExist(this.grupoSelecionado)) {
      return;
    }

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
  async checkGroupExist(grupo: Grupo) {
    const grupo$ = await this.grupoService.getGrupos().toPromise();
    const _grupo = grupo$.find(
      (g) => g.nome.toLocaleLowerCase() == grupo.nome.toLocaleLowerCase()
    );
    if (_grupo && _grupo.grupoId != grupo.grupoId) {
      this.salvarTexto = 'Já existe';
      setInterval(() => (this.salvarTexto = 'Salvar'), 3000);
      return true;
    } else {
      return false;
    }
  }
  voltarClicked() {
    this.router.navigateByUrl('/grupos');
  }
}
