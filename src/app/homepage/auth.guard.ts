import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   let url: string = state.url;
  //   return this.verifyLogin(url);
  // }
  // verifyLogin(url): boolean {
  //   if (!this.isLoggedIn()) {
  //     this.router.navigate(['/dashboard']);
  //     return false;
  //   }
  //   else if (this.isLoggedIn()) {
  //     return true;
  //   }
  // }
  public isLoggedIn(): boolean {
    let status = false;
    if (sessionStorage.getItem('isLoggedIn') == "true") {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (sessionStorage.getItem('token_type') != null) 
    {
      sessionStorage.setItem('isLogin',"1");
      if (sessionStorage.getItem('isLogin') != null) 
      {

      }
     
      return true;
    }
    else
     {
      this.router.navigate(['/adminlogin']);
      return false
    }

  }
}
