import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, take } from 'rxjs/operators';

import { Cliente } from 'src/app/models/Cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  url = `${environment.API}/TesteClientes/`;

  constructor(private httpClient: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.httpClient
      .get<Cliente[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  createCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient
      .post<Cliente>(this.url, cliente)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.httpClient
      .put<Cliente>(this.url, cliente)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteCliente(cliente: Cliente) {
    return this.httpClient
      .delete<Cliente>(this.url, {
        params: { clienteId: cliente.clienteId.toString() },
      })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
