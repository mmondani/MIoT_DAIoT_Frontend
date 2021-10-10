import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetailComponent } from './device-detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DeviceDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule
  ],
  exports: [
    DeviceDetailComponent
  ]
})
export class DeviceDetailModule { }
