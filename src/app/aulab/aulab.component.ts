import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ServerService} from '../server.service';

import { routerTransition } from '../config.service';
import {AuthServiceService} from '../auth-service.service';
import { AuUser } from '../auuser';


import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-aulab',
  templateUrl: './aulab.component.html',
  styleUrls: ['./aulab.component.css']
})
export class AulabComponent implements OnInit {

  username;
  hospitalid;
  userList: AuUser[]=[];
  hospitaldetails:any;
 

  constructor(private router: Router,private serverService: ServerService,private Auth: AuthServiceService) { }

  ngOnInit() {

    this.getAUList();
    this.gethospitaldetails();
    this.getHospital_type();
  }

  newSample(){
    this.router.navigate(['aulabsample']);
  }

  //to get au sample list
  getAUList()
  {
    //this.username=sessionStorage.getItem(name);
    this.hospitalid = Number(sessionStorage.getItem("hospital_id"));
    this.serverService.getAllAUpatients(this.hospitalid)
    .subscribe(
      (userList) =>{
       
        this.userList=userList;
        
        
        for(var i=0;i<this.userList.length;i++){
          var d = new Date(this.userList[i].date_of_sample);
          var d1 =  d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
          d.getHours() + ":" + d.getMinutes();
          this.userList[i].date_of_sample = d1;;
        }
        this.userList =  this.userList.reverse();
        console.log(this.userList)
        
        
        },
    (error) =>console.log(error)
    );
  }

  // to get hospital address
  gethospitaldetails(){
    this.serverService.gethospitaldetails()
    .subscribe((response)=>{this.hospitaldetails=response
   
      sessionStorage.setItem("hosp_address",response.hospital_address);
      //sessionStorage.setItem("hosp_type",response.hospital_type);
      
    }
    )
  }

  // to get hosp_type based on which price for test is deternimed in addd/edit sample page
  getHospital_type(){

    this.serverService.getHospital_type()
    .subscribe((response)=>{
      
   
      sessionStorage.setItem("hosp_type",response.hospital_type);
      
    }
    )

  }
  logOut(){
    this.Auth.logout();
    sessionStorage.clear();
  }
}
