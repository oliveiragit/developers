import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Grupo } from '../shared/Grupo';
import { GruposService } from '../shared/grupos.service';

@Component({
  selector: 'app-grupos-form',
  templateUrl: './grupos-form.component.html',
  styleUrls: ['./grupos-form.component.scss'],
})
export class GruposFormComponent implements OnInit {
  form: FormGroup;
  grupos$: Observable<Grupo>;
  grupo: Grupo;
  title: string;
  salvarTexto: string;
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
      this.grupos$ = this.grupoService.updateGrupo(this.grupo).pipe(
        catchError((error) => {
          console.error(error);
          this.err = 'Falha ao atualizar o grupo';
          return EMPTY;
        })
      );
    } else {
      this.grupos$ = this.grupoService.createGrupo(this.grupo).pipe(
        catchError((error) => {
          console.error(error);
          this.err = 'Falha ao criar o grupo';
          return EMPTY;
        })
      );
    }
    this.grupos$.subscribe((t) => this.voltarClicked());
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
