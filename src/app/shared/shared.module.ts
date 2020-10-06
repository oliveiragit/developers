import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { TabsModule } from 'ngx-bootstrap/tabs';

import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule,
    // BsDropdownModule.forRoot(),
    // TooltipModule.forRoot(),
    // ModalModule.forRoot(),
    // TabsModule.forRoot(),
  ],
  exports: [
    FilterPipe,
    // TabsModule,
    // BsDropdownModule,
    // TooltipModule,
    // ModalModule,
  ],
})
export class SharedModule {}
