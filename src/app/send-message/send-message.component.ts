import { Component, OnInit } from '@angular/core';
import {ServerService} from '../server.service';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css']
})
export class SendMessageComponent implements OnInit {
  
  sample_id;
  new_message:any;
  message:any;
  checkImgSrc=0;
  npnumber;
  new_message1;
  rowNum1;
  selectedFile:File[]=[];
  x=0;
  rowNum2;
  form : FormGroup;
  addnotification:Notification = {} as any; 
  myImgUrl: string;
  sampleid;
  npnum;
 
  
  constructor(private serverService: ServerService,
    private router: Router,private toastr: ToastrService) {
      
     }
 
     
  ngOnInit() {
    this.get_new_message();
   

  }

  onFileSelected(event)
  {
    for(var i=0; i<event.target.files.length;i++)
    this.selectedFile[this.x++] =<File>event.target.files[i];
  }


  onUpload()
  {
    
    this.checkImgSrc = 1;
   
    this.serverService.sendImages(this.selectedFile,this.checkImgSrc)
    .subscribe(res=>{

      this.toastr.success('Success', "Sent message",{
        positionClass: 'toast-bottom-center' 
     });
      
      
    });
    this.x=0;
  }

get_new_message(){
  this.sample_id=sessionStorage.getItem("sampleid");
 
  this.serverService.get_each_message()
    .subscribe((response)=>{this.new_message=response
      

      this.new_message =  this.new_message.reverse();
      for(var i=0;i<this.new_message.length;i++){

       
        var d = new Date(this.new_message[i].created_at);
	    	
        this.new_message[i].created_at = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
    d.getHours() + ":" + d.getMinutes();

        this.npnumber = this.new_message[0].np_num;
        sessionStorage.setItem("npnumber",this.npnumber);
        this.new_message1 = this.new_message[0].sample_id;
       
        if(this.new_message[i].portal_flag === 1){
          this.rowNum1 = 0;
        }else
       
        this.rowNum2 =0;
       
      }
      
      
      
    })
  }
  
  submitNotification(){
    
  
    this.serverService.post_notification(this.message)
      .subscribe(
        (response) =>{
           
            this.router.navigateByUrl('/dashboard/testlist')
            this.checkImgSrc=1;
            this.onUpload();
           
        }
      )
    
  }
  

  
}
