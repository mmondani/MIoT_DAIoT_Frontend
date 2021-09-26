import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    console.log("Evaluo auth guard");

    if (!this.loginService.isLoggedIn()) {
      console.log("No tengo token");
      this.router.navigate(["/login"]);
      return false;
    }

    console.log("Tengo token");
    return true;
  }
  
}
