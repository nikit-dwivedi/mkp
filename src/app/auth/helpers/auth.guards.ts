import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

import { AuthenticationService } from "app/auth/service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  /**
   *
   * @param {Router} _router
   * @param {AuthenticationService} _authenticationService
   */
  constructor(private _router: Router, private _authenticationService: AuthenticationService) {}

  // canActivate
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this._authenticationService.currentUserValue;
    
    
    if (currentUser?.token) {
      // check if route is restricted by role
      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this._router.navigate(["/pages/authentication/login-v2"], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
