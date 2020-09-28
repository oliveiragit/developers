import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, delay, take } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Cliente } from 'src/app/models/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) {}

  private readonly API = `${environment.API}/TesteClientes`;

  getClientes() {
    return this.http
      .get<Cliente[]>(this.API)
      .pipe(delay(2000), tap(console.log));
  }

  loadByID(id) {
    return this.http.get<Cliente>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(cliente) {
    return this.http.post(this.API, cliente).pipe(take(1));
  }

  private update(cliente) {
    return this.http.put(`${this.API}/${cliente.id}`, cliente).pipe(take(1));
  }

  save(cliente) {
    if (cliente.id) {
      return this.update(cliente);
    }
    return this.create(cliente);
  }

  remove(id) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
