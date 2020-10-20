import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Grupo } from '../shared/Grupo';
import { GruposService } from '../shared/grupos.service';

@Component({
  selector: 'app-grupos-list',
  templateUrl: './grupos-list.component.html',
  styleUrls: ['./grupos-list.component.scss'],
})
export class GruposListComponent implements OnInit {
  searchAtivo: boolean;
  searchString: string;
  err: any;

  grupos: Observable<Grupo[]>;
  grupoSelecionado: any;
  gruposFiltro: Observable<Grupo[]>;

  constructor(
    private grupoService: GruposService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.grupos = this.grupoService.getGrupos().pipe(
      catchError((error) => {
        this.errorHandler('Falha ao buscar os grupos!');
        return EMPTY;
      })
    );
  }

  onEdit(grupo: Grupo): void {
    this.router.navigate(['']);
    this.router.navigate(['editar', grupo.grupoId], {
      state: { grupo },
      relativeTo: this.route,
    });
  }

  onDelete(grupo: Grupo): void {
    if (
      confirm(`O grupo ${grupo.nome.toUpperCase()} será apagado. Tem certeza?`)
    ) {
      const deleted = this.grupoService.deleteGrupo(grupo).pipe(
        catchError((error) => {
          this.errorHandler('Ainda tem clientes cadastrados?');
          return EMPTY;
        })
      );
      deleted.subscribe(() => this.ngOnInit());
    }
  }

  novoGrupo(): void {
    this.router.navigate(['form'], { relativeTo: this.route });
  }
  errorHandler(message): void {
    this.err = message;
    setTimeout(() => {
      this.err = null;
    }, 4000);
  }
}
