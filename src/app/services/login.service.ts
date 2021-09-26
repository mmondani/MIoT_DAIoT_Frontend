import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface LoginResponse {
  success: boolean,
  msg: string,
  token: string
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = "192.168.1.101"

  constructor(private http: HttpClient, private router: Router) { }

  public async login (email:string, password: string) {
    let options = {
      observe: 'response' as const
    };

    let response = await this.http.post<LoginResponse> (
                                  this.URL + "/login",
                                  {email: email, password: password},
                                  options).toPromise();
    
    if (response.status == 200 && response.body) {
      console.log("Login OK. Token: " + response.body.token);
      localStorage.setItem("token", response.body.token);
      this.router.navigate(["/"]);
    }
  }

  public logout () {
    localStorage.removeItem("token");
  }

  public isLoggedIn (): boolean {
    return true;
    //return (localStorage.getItem('token') !== null);
  }
}