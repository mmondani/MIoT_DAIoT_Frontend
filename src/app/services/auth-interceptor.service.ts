import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Auth Interceptor");

    if (req.url.includes("/login")) {
      console.log("Auth Interceptor - login");
      return next.handle(req);
    }

    const token = localStorage.getItem("token");

    if (token) {
      console.log("Auth Interceptor - agrego token al header");

      const modifiedRequest = req.clone({
        headers: req.headers.append('Authorization', localStorage.getItem("token"))
      })

      return next.handle(modifiedRequest);
    }

    console.log("Auth Interceptor - no tengo token");

    this.router.navigate(["/login"]);

    return null;
  }
}
