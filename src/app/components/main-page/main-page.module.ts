import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../../app-routing.module';
import { DevicesListModule } from './devices-list/devices-list.module';
import { DeviceDetailModule } from './device-detail/device-detail.module';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    AppRoutingModule,
    DevicesListModule,
    DeviceDetailModule
  ]
})
export class MainPageModule { }
