import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevicesListComponent } from './devices-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DevicesListComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DevicesListComponent
  ]
})
export class DevicesListModule { }
