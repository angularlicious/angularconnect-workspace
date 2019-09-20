import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnumKeysPipe } from './pipes/enum-keys.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [EnumKeysPipe],
  exports: [EnumKeysPipe],
})
export class ComponentsModule {}
