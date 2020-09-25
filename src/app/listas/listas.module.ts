import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { GruposComponent } from './grupos/grupos.component';

@NgModule({
  declarations: [ClientesComponent, GruposComponent],
  imports: [
    CommonModule
  ]
})
export class ListasModule { }
