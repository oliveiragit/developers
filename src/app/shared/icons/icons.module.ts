import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Edit, Trash2, CheckCircle, XCircle } from 'angular-feather/icons';

const icons = {
  Edit,
  Trash2,
  CheckCircle,
  XCircle
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
