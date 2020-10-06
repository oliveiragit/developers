import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';

const clientesRoutes: Routes = [
  { path: '', component: ClientesListComponent },
  { path: 'form', component: ClientesFormComponent },
  { path: 'editar/:id', component: ClientesFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(clientesRoutes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
