import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesComponent } from './clientes/clientes.component';
import { GruposComponent } from './grupos/grupos.component';
import { CadastrosRoutingModule } from './cadastros.routing';

@NgModule({
  declarations: [ClientesComponent, GruposComponent],
  imports: [CommonModule, CadastrosRoutingModule],
})
export class CadastrosModule {}
