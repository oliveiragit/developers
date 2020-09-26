import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, delay, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Grupo } from 'src/app/models/Grupo';

@Injectable({
  providedIn: 'root',
})
export class GruposService {
  constructor(private http: HttpClient) {}

  private readonly API = `${environment.API}/TesteGrupos`;

  private grupos: Grupo[] = [
    // { grupoId: 1, nome: 'jose', ativo: true },
    // { grupoId: 1, nome: 'jose', ativo: true },
    // { grupoId: 1, nome: 'jose', ativo: true },
  ];

  // getGrupos() {
  //   return this.grupos;
  // }

  getGrupos() {
    return this.http.get<Grupo[]>(this.API).pipe(delay(2000), tap(console.log));
  }

  loadByID(id) {
    return this.http.get<Grupo>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(grupo) {
    return this.http.post(this.API, grupo).pipe(take(1));
  }

  private update(grupo) {
    return this.http.put(`${this.API}/${grupo.id}`, grupo).pipe(take(1));
  }

  save(grupo) {
    if (grupo.id) {
      return this.update(grupo);
    }
    return this.create(grupo);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
