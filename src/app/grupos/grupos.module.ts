import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GruposRouting } from './grupos.routing';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';
import { GruposComponent } from './grupos.component';
import { IconsModule } from '../icons/icons.module';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  declarations: [GruposComponent, GrupoFormComponent],
  imports: [
    CommonModule,
    GruposRouting,
    IconsModule,
    ReactiveFormsModule,
    FormsModule,
    PipesModule
  ],
  providers: [],
})
export class GruposModule {}
