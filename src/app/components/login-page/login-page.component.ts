import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{ 

  @ViewChild('loginErrorModal') loginErrorModal : any;

  public email:string = "";
  public password:string = "";

  constructor (private loginService: LoginService, private router: Router, private modalService: NgbModal) {

  }
  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(["/"]);
    }
  }

  public async onSubmit() {
    try {
      await this.loginService.login(this.email, this.password);
    }catch(error) {
      this.modalService.open(this.loginErrorModal,{size: "md"});
    }
  }

  public forgotPassword() {
    console.log("forgot password")
  }
}
