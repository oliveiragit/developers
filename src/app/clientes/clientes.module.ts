import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes.routing';
import { ClientesComponent } from './clientes.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { ClientesService } from './clientes.service';
import { IconsModule } from '../icons/icons.module';


@NgModule({
  declarations: [
    ClientesComponent,
    ClienteFormComponent,
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    IconsModule,
  ],

  providers: [ClientesService],
})
export class ClientesModule {}
