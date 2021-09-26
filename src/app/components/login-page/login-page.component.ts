import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{ 

  public email:string = "";
  public password:string = "";

  constructor (private loginService: LoginService, private router: Router) {

  }
  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
  }

  public async onSubmit() {
    await this.loginService.login(this.email, this.password);
  }

  public forgotPassword() {
    console.log("forgot password")
  }
}
