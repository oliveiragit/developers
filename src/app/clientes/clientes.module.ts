import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes.routing';
import { ClientesComponent } from './clientes.component';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { IconsModule } from '../icons/icons.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [ClientesComponent, ClienteFormComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
  ],

  providers: [],
})
export class ClientesModule {}
