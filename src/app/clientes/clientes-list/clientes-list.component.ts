import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Cliente } from 'src/app/clientes/shared/Cliente';
import { GruposService } from 'src/app/grupos/shared/grupos.service';
import { Grupo } from 'src/app/grupos/shared/Grupo';
import { ClientesService } from '../shared/clientes.service';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss'],
})
export class ClientesListComponent implements OnInit {
  clientes$: Observable<Cliente[]>;
  cliente: Cliente;
  searchString: string;
  searchAtivo: boolean;
  err: any;

  constructor(
    private clienteService: ClientesService,
    private grupoService: GruposService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.iniciarClientes();
  }

  iniciarClientes(): void {
    const clis$ = this.clienteService.getClientes().pipe(
      catchError((error) => {
        this.errorHandler('Falha ao carregar!');
        return EMPTY;
      })
    );

    const grupos$ = this.grupoService.getGrupos().pipe(
      catchError((error) => {
        this.errorHandler('Falha ao carregar!');
        return EMPTY;
      })
    );

    const mergeById = ([clientes, grupos]) =>
      clientes.map((cli: Cliente) =>
        Object.assign({}, cli, {
          grupoView: grupos.find((gru: Grupo) => {
            return gru.grupoId === cli.grupoId;
          }),
        })
      );

    this.clientes$ = combineLatest([clis$, grupos$]).pipe(map(mergeById));
  }

  onEdit(cliente: Cliente): void {
    this.router.navigate(['']);
    this.router.navigate(['editar', cliente.clienteId], {
      state: { cliente },
      relativeTo: this.route,
    });
  }

  onDelete(cliente: Cliente): void {
    if (
      confirm(
        `O cliente ${cliente.nome.toUpperCase()} será apagado. Tem certeza?`
      )
    ) {
      this.clienteService.deleteCliente(cliente).pipe(
        catchError((error) => {
          this.errorHandler('Falha ao remover!');
          return EMPTY;
        })
      ).subscribe(() => this.iniciarClientes());
    }
  }

  novoCliente(): void {
    this.router.navigate(['form'], { relativeTo: this.route });
  }
  errorHandler(message: string): void {
    this.err = message;
    setTimeout(() => {
      this.err = null;
    }, 4000);
  }
}
