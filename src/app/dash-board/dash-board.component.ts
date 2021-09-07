import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ServerService} from '../server.service';
import { routerTransition } from '../config.service';
import {Requests} from './requests';
import {AuthServiceService} from '../auth-service.service';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
//  animations: [routerTransition()],
  //host: {'[@routerTransition]': ''}
})
export class DashBoardComponent implements OnInit {

  active:string;
  hospitaldetails:Requests
  username= sessionStorage.getItem(name);
  messages:any;
  rowNum = 1;
  notification_count;
  count;
  data_count;
  count1;
  
  
  constructor(private router: Router,private toastr: ToastrService,private serverService: ServerService,private Auth: AuthServiceService) {
    this.router.events.subscribe((val) => {
      this.routeChanged(val);
    });
  }

  ngOnInit() {
    this.gethospitaldetails();
    this.getmessages();
    this.get_notification_count();
    this.getHospital_type();
    
  }

  onClickNote(){
    this.router.navigate(["notification"])
  }

  routeChanged(val){
    this.active = val.url;
  }

  //to get hospital address which will be displayed in add/edit/preview sample pages
  gethospitaldetails(){
    this.serverService.gethospitaldetails()
    .subscribe((response)=>{this.hospitaldetails=response
      sessionStorage.setItem("hosp_address",response.hospital_address);
      
    }
    )
  }

  // to get hospital type based on that the price for tests is determined
  getHospital_type(){

    this.serverService.getHospital_type()
    .subscribe((response)=>{
      sessionStorage.setItem("hosp_type",response.hospital_type);
      
    }
    )

  }

  //get the notification count
  get_notification_count(){
    this.serverService.get_notification_count()
    .subscribe((response)=>{this.notification_count=response
      
      this.count = this.notification_count;
      var el = document.querySelector('.notification');
      el.setAttribute("data_count",this.notification_count);
     
      if(this.notification_count > 0){
        el.classList.add('show_count');
        }

      })
    
  }

  //get all messages of all sample_ids of hospital
  getmessages(){
    
    this.serverService.getmessages()
    .subscribe((response)=>{this.messages=response
     
    })
    
    }
    

  logOut(){
      // this.Auth.logout();
      // sessionStorage.clear();

      if(sessionStorage.getItem("addSample") == "true"){

        if( window.confirm("Are you sure you want to leave?Data entered will be lost if you leave without submitting")){
          sessionStorage.setItem("addSample","false");
          this.Auth.logout();
          sessionStorage.clear();
        }

      }else{
     
        this.Auth.logout();
          sessionStorage.clear();
      }
    }

    
    home(){

      if(sessionStorage.getItem("addSample") == "true"){

        if( window.confirm("Are you sure you want to leave?Data entered will be lost if you leave without submitting")){
          sessionStorage.setItem("addSample","false");
        this.router.navigate(["/lablist"]);
        }

      }else{
     
        this.router.navigate(["/lablist"]);
      }
     
    }

    testlist(){

      if(sessionStorage.getItem("addSample") == "true"){

        if( window.confirm("Are you sure you want to leave?Data entered will be lost if you leave without submitting")){
          sessionStorage.setItem("addSample","false");
        this.router.navigate(["/dashboard/testlist"]);
        }

      }else{
     
        this.router.navigate(["/dashboard/testlist"]);
      }
     
    }

    notify(){
     
      if(sessionStorage.getItem("addSample") == "true"){

        if( window.confirm("Are you sure you want to leave?Data entered will be lost if you leave without submitting")){
          sessionStorage.setItem("addSample","false");
        this.router.navigate(["/dashboard/notification"]);
        }

      }else{
     
        this.router.navigate(["/dashboard/notification"]);
      }
    }
  }
 