import { Component, OnInit } from '@angular/core';
import {ServerService} from '../server.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {

  constructor(private serverService: ServerService,private router: Router) { }

  ngOnInit() {
  this.emailVerify();
  }


  //begin code to update the verify_email_flag
  emailVerify(){

    var url_path=this.router.url;
    var arr=url_path.split("?");
    var arr1=arr[1].split("=");
    var dec = atob(decodeURIComponent(arr1[1]));
    
    this.serverService.emailVerify(dec)
    .subscribe(
      (response) =>{
       
          // setInterval(() => {
           
          //   this.router.navigateByUrl('');
          //   }, 4000);
          setTimeout(() => {
            this.router.navigateByUrl('');
        }, 5000);
        
          
      }
    )

  }
  //end of code

}
