import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { FilterPipe } from './pipes/filter.pipe';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [FilterPipe],
  imports: [CommonModule, ModalModule.forRoot(), NgxMaskModule.forRoot()],
  exports: [FilterPipe, ModalModule, NgxMaskModule],
})
export class SharedModule {}
