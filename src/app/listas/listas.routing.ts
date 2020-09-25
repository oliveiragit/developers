import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesComponent } from './clientes/clientes.component';
import { GruposComponent } from './grupos/grupos.component';

const listasRoutes: Routes = [
  { path: 'clientes', component: ClientesComponent },
  { path: 'grupos', component: GruposComponent },
];

@NgModule({
  imports: [RouterModule.forChild(listasRoutes)],
  exports: [RouterModule],
})
export class ListasRouting {}
