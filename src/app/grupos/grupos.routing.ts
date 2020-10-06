import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GruposFormComponent } from './grupos-form/grupos-form.component';

import { GruposListComponent } from './grupos-list/grupos-list.component';

const gruposRoutes: Routes = [
  { path: '', component: GruposListComponent },
  { path: 'form', component: GruposFormComponent },
  { path: 'editar/:id', component: GruposFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(gruposRoutes)],
  exports: [RouterModule],
})
export class GruposRouting {}
