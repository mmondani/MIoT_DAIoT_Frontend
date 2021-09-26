import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{ 

  constructor (private loginService: LoginService, private router: Router) {

  }
  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
  }
}
