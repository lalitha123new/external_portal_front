import { Component, OnInit } from '@angular/core';
import {ServerService} from '../server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { ToastrService, ToastRef } from 'ngx-toastr';
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  email ="";
  form:FormGroup;
  submitted_data_pass = false;

  constructor(private serverService: ServerService,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {

    this.form =new FormGroup({
      email: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),Validators.required])
    })
  }

  toggleButton(){
    this.submitted_data_pass = true;
   this.email = this.form.get('email').value;
  
    this.serverService.forgotPassword(this.email)
    .subscribe(
      (response) =>{
      //   this.toastr.success('Success', "Please follow the link sent to your email id for new password.",{
      //     positionClass: 'toast-bottom-center' 
      //  });
      alert("Please follow the link sent to your email id for new password.");
        this.router.navigateByUrl('')
       
        
    
        
          
      }
    )
  }
    

}
