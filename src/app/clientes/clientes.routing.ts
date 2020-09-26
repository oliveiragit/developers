import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClientesComponent } from './clientes.component';

const clientesRoutes: Routes = [
  { path: '', component: ClientesComponent },
  { path: 'form', component: ClienteFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(clientesRoutes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
