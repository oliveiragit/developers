import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GruposRouting } from './grupos.routing';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';
import { GruposComponent } from './grupos.component';
import { IconsModule } from '../icons/icons.module';
import { FilterPipe } from 'src/app/pipes/filter.pipe';

@NgModule({
  declarations: [
    GruposComponent,
    GrupoFormComponent,
    FilterPipe],
  imports: [
    CommonModule,
    GruposRouting,
    IconsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class GruposModule {}
