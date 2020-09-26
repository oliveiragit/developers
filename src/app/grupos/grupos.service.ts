import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, delay, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Grupo } from 'src/app/models/Grupo';

@Injectable({
  providedIn: 'root',
})
export class GruposService {
  private grupos: Grupo[] = [
    { grupoId: 1, nome: 'jose', ativo: true },
    { grupoId: 1, nome: 'jose', ativo: true },
    { grupoId: 1, nome: 'jose', ativo: true },
  ];

  getGrupos() {
    return this.grupos;
  }
  constructor() {}
}

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadByID(id) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  private update(curso) {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso) {
    if (curso.id) {
      return this.update(curso);
    }
    return this.create(curso);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
