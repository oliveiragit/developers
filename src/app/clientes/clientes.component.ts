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
  clienteSelecionado

  constructor(
    private clienteService: ClientesService,
    private grupoService: GruposService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const clientes$ = this.clienteService.getClientes().pipe(
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );

    const grupos$ = this.grupoService.getGrupos().pipe(
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );

    const mergeById = ([clientes, grupos]) =>
      clientes.map((cli: Cliente) =>
        Object.assign(
          {},
          cli, {
          grupo: grupos.find((gru: Grupo) => gru.grupoId === cli.grupoId),
        })
      );

    this.clientes = combineLatest([clientes$, grupos$]).pipe(map(mergeById));
  }


  onEdit(cliente: Cliente) {
    this.router.navigate(['']);
    this.router.navigate(['editar', cliente.grupoId], {
      state: { cliente },
      relativeTo: this.route,
    });
  }

  onDelete(cliente: Cliente) {
    if (confirm(`O grupo ${cliente.nome} será apagado. Tem certeza?`)) {
      this.clienteService.deleteCliente(cliente).subscribe(this.clienteSelecionado);
    }
  }

  novoCliente() {
    this.router.navigate(['form'], { relativeTo: this.route });
  }
}
