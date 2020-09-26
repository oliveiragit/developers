import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';

import { GruposComponent } from './grupos.component';

const gruposRoutes: Routes = [
  { path: '', component: GruposComponent },
  { path: 'form', component: GrupoFormComponent },
  { path: 'editar/:id', component: GrupoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(gruposRoutes)],
  exports: [RouterModule],
})
export class GruposRouting {}
