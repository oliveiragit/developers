import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GruposRouting } from './grupos.routing';
import { GrupoFormComponent } from './grupo-form/grupo-form.component';
import { GruposComponent } from './grupos.component';

@NgModule({
  declarations: [GrupoFormComponent, GruposComponent],
  imports: [
    CommonModule,
    GruposRouting
  ],
})
export class GruposModule {}
