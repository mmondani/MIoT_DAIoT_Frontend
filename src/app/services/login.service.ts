import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';


interface LoginResponse {
  success: boolean,
  msg: string,
  token: string
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private URL = "http://localhost:3000"

  constructor(private http: HttpClient, private router: Router) { }

  public async login (email:string, password: string) {
    let options = {
      observe: 'response' as const
    };

    try {
      let response = await this.http.post<LoginResponse> (
                                    this.URL + "/login",
                                    {email: email, password: password},
                                    options).toPromise();

      if (response.status == 200 && response.body) {
        let token = response.body.token.split(" ")[1];
        console.log("Login OK. Token: " + token);
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);
        this.router.navigate(["/board"]);
      }
    }
    catch(error) {
      console.log(error);
      throw new Error("");
    }
  }

  public logout () {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    this.router.navigate(["/login"]);
  }

  public isLoggedIn (): boolean {
    return (localStorage.getItem('token') !== null);
  }
}