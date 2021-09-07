import { Component, OnInit } from '@angular/core';
import {ServerService} from '../server.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { ToastrService, ToastRef } from 'ngx-toastr';
@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css']
})
export class NewpassComponent implements OnInit {
  email_old ="";
  form:FormGroup;
  new_password = "";
  submitted_data_new = false;

  constructor(private serverService: ServerService,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {

    var url_path=this.router.url;
    var arr=url_path.split("?");
    var arr1=arr[1].split("=");
    var dec = atob(decodeURIComponent(arr1[1]));
    this.email_old = dec;
    //console.log(this.email_old)
    this.form =new FormGroup({
      email: new FormControl('',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"),Validators.required]),
     
      pass: new FormControl('',[,Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]),
      confirm_pass: new FormControl('',[,Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{5,}')]),
    })
  }

  toggleButton(){
    if(this.form.get('pass').value.length > 5){
      if(this.form.get('pass').value === this.form.get('confirm_pass').value){
        this.submitted_data_new = true;
          this.new_password  = this.form.get('pass').value;
          //this.email  =  this.form.get('email').value;

          this.serverService.newPassword(this.email_old,this.new_password )
          .subscribe(
            (response) =>{
               console.log(response)
               //this.form.reset();
            this.toastr.success('Success', "New password is saved.");
            // setInterval(() => {
         
            //   this.router.navigateByUrl('');
             
            //   }, 4000);
            sessionStorage.removeItem(name);
            sessionStorage.removeItem('LoggedInUser');
            this.router.navigate(['/']);
                
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

}
