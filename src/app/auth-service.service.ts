import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthServiceService {

  constructor(private myRoute: Router,private toastr:ToastrService) { 
  }
  sendToken(token: string) {
    
    sessionStorage.setItem('LoggedInUser', token)
  }
  getToken() {
    return sessionStorage.getItem('LoggedInUser')
  }
  isLoggedIn() {
    if(this.getToken()===null)
    {
      return false;
    }
    return true;
  }
  logout() {
    sessionStorage.removeItem(name);
    sessionStorage.removeItem('LoggedInUser');
    this.toastr.success('Success', "Logged Out Successfully",{
      positionClass: 'toast-bottom-center' 
   });
    this.myRoute.navigate(['/']);
  }

}
