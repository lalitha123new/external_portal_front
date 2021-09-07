import { Component, OnInit } from '@angular/core';
import {Login} from '../login';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import {ServerService} from '../server.service';
import { Router } from '@angular/router';
import { routerTransition } from '../config.service';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService} from '../auth-service.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
    loginUser: Login={} as any;
    form:FormGroup;
    name;
    hospital_id;
    toggleform: boolean= false;
    toggleButton()
    {
      this.loginUser={username:this.form.get('name').value, password:this.form.get('pass').value}
      this.serverService.loginUser(this.loginUser)
      .subscribe(
        (response) =>{
          console.log(response)
                 if(response > 0)
                          {
                            
                          this.auth.sendToken(this.loginUser.username);
                          sessionStorage.setItem(name,this.loginUser.username);
                          sessionStorage.setItem("hospital_id",response);
                          this.router.navigate(['/lablist'])
                          this.toastr.success('Success', "Logged In Successfully",{
                            positionClass: 'toast-bottom-center' 
                         });
                          }else
                          {
                            this.toggleform=true;
                            this.toastr.error('Failed', "Invalid Credentials",{
                              positionClass: 'toast-bottom-center' 
                           });
                          }
                       
                      },
        (error) =>console.log(error)
      );
    
    }  
    
    constructor(private serverService: ServerService,private auth: AuthServiceService,
      private router: Router,private toastr: ToastrService) {}

  ngOnInit() {
    this.form =new FormGroup({
        name: new FormControl('',[Validators.required]),
        pass: new FormControl('',[Validators.required])
    })

    
  }
  forgotPassword(){
    this.router.navigate(['/forgotpass'])
  }
 

}
