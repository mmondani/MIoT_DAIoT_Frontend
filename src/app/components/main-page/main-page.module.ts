import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class MainPageModule { }
