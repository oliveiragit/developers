import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, take } from 'rxjs/operators';

import { Grupo } from 'src/app/models/Grupo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GruposService {
  url = `${environment.API}/TesteGrupos/`;

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  getGrupos(): Observable<Grupo[]> {
    return this.httpClient
      .get<Grupo[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  createGrupo(grupo: Grupo): Observable<Grupo> {
    return this.httpClient
      .post<Grupo>(this.url, grupo)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateGrupo(grupo: Grupo): Observable<Grupo> {
    return this.httpClient
      .put<Grupo>(this.url, grupo)
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteGrupo(grupo: Grupo) {
    return this.httpClient
      .delete<Grupo>(this.url)
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
