import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientesRoutingModule } from './clientes.routing';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { IconsModule } from '../shared/icons/icons.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ClientesListComponent, ClientesFormComponent],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],

  providers: [],
})
export class ClientesModule {}
