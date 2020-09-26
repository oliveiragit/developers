import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes.routing';
import { ClientesComponent } from './clientes.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';

@NgModule({
  declarations: [ClientesComponent, ClienteFormComponent],
  imports: [CommonModule, ClientesRoutingModule],
})
export class ClientesModule {}
