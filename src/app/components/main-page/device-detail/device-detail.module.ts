import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetailComponent } from './device-detail.component';

@NgModule({
  declarations: [
    DeviceDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DeviceDetailComponent
  ]
})
export class DeviceDetailModule { }
