import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable, combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Cliente } from 'src/app/models/Cliente';
import { GruposService } from '../grupos/grupos.service';
import { Grupo } from '../models/Grupo';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clientes: Observable<any[]>;
  searchString: string;
  searchAtivo: boolean;
  clienteSelecionado;
  err: any;

  constructor(
    private clienteService: ClientesService,
    private grupoService: GruposService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.iniciarClientes();
  }
  iniciarClientes() {
    const clientes$ = this.clienteService.getClientes().pipe(
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
        Object.assign(
          {},
          cli,
          {
            grupoView: grupos.find((gru: Grupo) => gru.grupoId === cli.grupoId),
          },
          {
            cpfView: cli.cpf.replace(
              /(\d{3})(\d{3})(\d{3})(\d{2})/,
              '$1.$2.$3-$4'
            ),
          }
        )
      );

    this.clientes = combineLatest([clientes$, grupos$]).pipe(map(mergeById));
  }

  onEdit(cliente: Cliente) {
    this.router.navigate(['']);
    this.router.navigate(['editar', cliente.clienteId], {
      state: { cliente },
      relativeTo: this.route,
    });
  }

  onDelete(cliente: Cliente) {
    if (
      confirm(
        `O cliente ${cliente.nome.toUpperCase()} será apagado. Tem certeza?`
      )
    ) {
      let deleted = this.clienteService.deleteCliente(cliente).pipe(
        catchError((error) => {
          this.errorHandler('Falha ao deletar!');
          return EMPTY;
        })
      );
      deleted.subscribe((s) => this.ngOnInit());
    }
  }

  novoCliente() {
    this.router.navigate(['form'], { relativeTo: this.route });
  }
  errorHandler(message) {
    this.err = message;
    setTimeout(() => {
      this.err = null;
    }, 4000);
  }
}
