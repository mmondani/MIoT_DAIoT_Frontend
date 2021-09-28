import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { DevicesListComponent } from './components/main-page/devices-list/devices-list.component';
import { DeviceDetailComponent } from './components/main-page/device-detail/device-detail.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'board',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DevicesListComponent
      },
      {
        path: ':deviceId',
        component: DeviceDetailComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
