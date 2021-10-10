import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetailComponent } from './device-detail.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
    DeviceDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DeviceDetailComponent
  ]
})
export class DeviceDetailModule { }
