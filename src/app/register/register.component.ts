import { Component, OnInit } from '@angular/core';
import {Register} from '../registeruser';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import {ServerService} from '../server.service';
import { Router } from '@angular/router';
import { ToastrService, ToastRef } from 'ngx-toastr';
import { AuthServiceService} from '../auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  registerUser: Register={} as any;
  form:FormGroup;
  options = ["private","government"];
  hosp_type;
  submitted_data = false;
  
  
  
  //save the hospital details
  toggleButton(){
   
   if(this.form.get('pass').value.length > 5){

   
    if(this.form.get('pass').value === this.form.get('confirm_pass').value){
     this.submitted_data = true;

      this.registerUser={
        nameofhospital:this.form.get('hosp_name').value, hospitalType:this.form.get('hosp_type').value,
        hospital_address:this.form.get('address').value,username:this.form.get('user_name').value,
        contact:this.form.get('phone').value,email:this.form.get('email').value,
        password:this.form.get('pass').value,
        verify_email_flag:1,
        review_flag:0,
        portal_flag:2
      }
      

        this.serverService.registerHospital(this.registerUser)
      .subscribe(
        (response) =>{
          console.log(response);
          if(response === "success"){
            this.router.navigateByUrl('')
          //   this.toastr.success('Success', "Please follow the link sent to your email id for activation of your account.",{
          //     positionClass: 'toast-bottom-center' 
          //  });
          alert("Please follow the link sent to your email id for activation of your account.");
           
          }else{
            this.submitted_data = false;
          //   this.toastr.error('Error', "E-mail already exists.",{
          //     positionClass: 'toast-bottom-center' 
          //  });
          alert("E-mail already exists.");
          }
          
          
            
        }
      )
    
      
    }else{
      this.toastr.error('Error', "Password and Confirm Password do not match.",{
        positionClass: 'toast-bottom-center' 
     });
    }
  }else{
    this.toastr.error('Error', "Password should be minimum 6 characters long.",{
      positionClass: 'toast-bottom-center' 
   });
  }
   
   
   
  
  } 
  constructor(private serverService: ServerService,private auth: AuthServiceService,
    private router: Router,private toastr: ToastrService) { }

  ngOnInit() {

    this.form =new FormGroup({
      hosp_name: new FormControl('',[Validators.required]),
      hosp_type: new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      user_name: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),Validators.required]),
      pass: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]),
      confirm_pass: new FormControl('',[Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')])
  })
  }

  
  
  
}
