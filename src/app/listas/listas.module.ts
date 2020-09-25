import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesComponent } from './clientes/clientes.component';
import { GruposComponent } from './grupos/grupos.component';
import { ListasRouting } from './listas.routing';

@NgModule({
  declarations: [
    ClientesComponent,
    GruposComponent
  ],
  imports: [
    CommonModule,
    ListasRouting
  ],
})
export class ListasModule {}
