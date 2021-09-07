import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthServiceService } from '../app/auth-service.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthServiceService,
    private myRoute: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(this.auth.isLoggedIn())
      {
       return true;
      }
       else{
       this.myRoute.navigate(['/'])
       return false;
      }
  }
}
