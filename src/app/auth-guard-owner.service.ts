
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardOwnerService implements CanActivate {


  constructor(private router: Router, private authService: AuthServiceService) { }

  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {

    if (this.authService.isOwnerAuthenticated() == true) {
      console.log("yeeeeeees")
      return true
    }
    else {
      this.router.navigate(["/"])
      console.log("yoooooou can't")
      return false;
    }

  }
}
