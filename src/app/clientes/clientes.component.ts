import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';

import { Cliente } from 'src/app/models/Cliente';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit {
  clientes: Observable<Cliente[]>;

  constructor(
    private clienteService: ClientesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.clientes = this.clienteService.getClientes().pipe(
      catchError((error) => {
        console.error(error);
        return EMPTY;
      })
    );
  }

  onEdit(cliente: Cliente) {
    this.router.navigate(['']);
    this.router.navigate(['editar', cliente.clienteId], { relativeTo: this.route });
  }

  onDelete(cliente: Cliente) {
    if (confirm(`O cliente ${cliente.nome} será apagado. Tem certeza?`)) {
      this.clienteService.remove(cliente.clienteId);
    }
  }
}
