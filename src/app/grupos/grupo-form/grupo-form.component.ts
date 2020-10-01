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
  grupo$: Observable<Grupo>;

  grupos: Observable<Grupo[]>;
  grupo: Grupo;

  form: FormGroup;
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
    this.activatedRoute.paramMap.pipe(map(() => window.history.state));

    if (history.state.grupo) {
      this.grupo = history.state.grupo;
      this.title = 'Editar Grupo';
    } else {
      this.grupo = new Grupo();
      this.title = 'Novo Grupo';
    }
    this.configForm();
  }

  configForm() {
    this.form = this.formBuilder.group({
      nome: [this.grupo.nome, [Validators.required, Validators.minLength(3)]],
      ativo: [this.grupo.ativo, Validators.required],
    });
  }
  async onSubmit() {
    this.salvarTexto = 'carregando...';

    const form = this.form.value;

    this.grupo = {
      ...this.grupo,
      ...form,
    };

    if (await this.checkGroupExist(this.grupo)) {
      return;
    }

    if (this.grupo.grupoId) {
      this.grupo$ = this.grupoService.updateGrupo(this.grupo).pipe(
        catchError((error) => {
          console.error(error);
          this.err = 'Falha ao atualizar o grupo';
          return EMPTY;
        })
      );
    } else {
      this.grupo$ = this.grupoService.createGrupo(this.grupo).pipe(
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
      setTimeout(() => (this.salvarTexto = 'Salvar'), 3000);
      return true;
    } else {
      return false;
    }
  }
  voltarClicked() {
    this.router.navigateByUrl('/grupos');
  }
}
