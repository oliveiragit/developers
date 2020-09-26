import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRouting } from './grupos.routing';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';
import { GruposComponent } from './grupos.component';
import { GruposService } from './grupos.service';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [GrupoFormComponent, GruposComponent],
  imports: [
    CommonModule,
    GruposRouting,
    IconsModule
  ],

  providers: [GruposService],
})
export class GruposModule {}