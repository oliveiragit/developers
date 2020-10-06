import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { GruposRouting } from './grupos.routing';
import { GruposFormComponent } from './grupos-form/grupos-form.component';
import { GruposListComponent } from './grupos-list/grupos-list.component';
import { IconsModule } from '../shared/icons/icons.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [GruposListComponent, GruposFormComponent],
  imports: [
    CommonModule,
    GruposRouting,
    IconsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  providers: [],
})
export class GruposModule {}
