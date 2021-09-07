import { Component, OnInit } from '@angular/core';
import {ServerService} from '../server.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';



@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {


  constructor(private serverService: ServerService, private router:Router) { }
  messages:any;
  rowNum1;
  rowNum2;
  sampleid;
  read_count;

  ngOnInit() {
    this.getmessages();
  }
  getmessages(){

    this.serverService.getmessages()
    .subscribe((response)=>{this.messages=response
    
      console.log(response);
     this.messages = this.messages.reverse();

      for(var i=0;i<this.messages.length;i++){
       
          if(this.messages[i].read_flag === 0){
          this.rowNum1 = 0;
          
          }else{
            this.rowNum1 = 1; 
          }

          var d = new Date(this.messages[i].created_at);
	    	
          this.messages[i].created_at = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
      d.getHours() + ":" + d.getMinutes();
        
      }
      
      })
    }

 send_message(sample_id,notify_id,npno){
  
  sessionStorage.setItem("sampleid",sample_id);
  sessionStorage.setItem("npnum",npno);
  this.router.navigate(["/dashboard/send-message"]);
  this.readNotification(notify_id);

}

 readNotification(notifyid){
 
   sessionStorage.setItem("notify_id",notifyid);
   this.serverService.get_readNotificationCount()
   .subscribe((response)=>{this.read_count=response
     window.location.reload();
   })

}

}
