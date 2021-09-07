import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute} from '@angular/router';
import{ ServerService} from '../server.service';
import { routerTransition } from '../config.service';
import {User} from '../user';
import {Requests} from '../dash-board/requests';
import {  Params } from '@angular/router'; 
import 'rxjs/add/operator/switchMap'; 
import { DatePipe } from '@angular/common';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-preview-page',
  templateUrl: './preview-page.component.html',
  styleUrls: ['./preview-page.component.css'],
  providers:[DatePipe],
  //animations: [routerTransition()],
 //	host: {'[@routerTransition]': ''}
})
export class PreviewPageComponent implements OnInit {
  index:any;
  sample:User[]=[];
  hospitaldetails:Requests;
  currentDate=new Date()
  date:any;
  isVisible=true;
  public newSample: any = {};
  public sampleArray: Array<any>=[];
  public dd_no: Array<any>=[];
  public sampleArray1: Array<any>=[];
  username= sessionStorage.getItem(name);
  imgArray=[]; 
  check_dd = false;
  check_online = false;
  hosp_address = "";
  age_array = [];

  other_check = false;
  slide_check = false;
  block_check = false;
  bottle_check = false;

  heading;
  bar_code_value;
  

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };
  constructor(private route: ActivatedRoute,private datePipe: DatePipe,  private serverService:ServerService,private toastr: ToastrService)
   {
    this.date = this.datePipe.transform(this.currentDate, 'dd--MM-yyyy');
    }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.serverService.getDetails(params['sample_id']))
    .subscribe((response)=>{this.sample=response;

     console.log(this.sample)
      var date_array1 = this.sample[0].date_of_entry.split(" ");
      var date_array2 = date_array1[0].split("-");
      
      // var d = new Date(),
      // month = '' + (d.getMonth() + 1),
      // day = '' + d.getDate(),
      // year = d.getFullYear();
      // if (month.length < 2) 
      // month = 0 + month;
      // if (day.length < 2) 
      // day = 0 + day;
      //var year1 = year.toString();
      

      //date with sample id format
      // var year1 = date_array2[0].substring(date_array2[0].length-2);
      // var sample_id = this.sample[0].sample_id.toString();
      // var bar_date= [date_array2[2],date_array2[1],year1,sample_id].join("");
      // this.bar_code_value = bar_date;


      this.age_array = this.sample[0].pat_age.split("-");
      
      
      this.sample[0].pat_age = this.age_array[0]+"Y" + "-" + this.age_array[1]+"M" + "-" +  this.age_array[2]+"D";
     
      this.imgArray= this.sample[0].sample_image_url.split(',');
      
      if(this.imgArray.length != null)

     
      if(this.sample[0].sample_image_url != null){

        if(this.imgArray.length>1){
        
        this.sample[0].sample_image_url =(this.imgArray.length-1).toString();
      }else if(this.imgArray.length ==1){
        
        this.sample[0].sample_image_url =(this.imgArray.length-1).toString();
      }
      }else{
      
        this.sample[0].sample_image_url = "";
      }
     
     
      this.sampleArray=JSON.parse(response[0].sample_test);
     

    

      


      for(var i = 0;i<this.sampleArray.length;i++){

        if(this.sampleArray[i].specimen === "Blocks"){
          this.block_check = true;

        } else  if(this.sampleArray[i].specimen === "Slides for Opinion" ){
          this.slide_check = true;

         }
         else if(this.sampleArray[i].specimen !="Blocks" && this.sampleArray[i].specimen !="Slides for Opinion"){

          this.other_check = true;
        }



      }

      if(this.block_check == true && this.slide_check == false && this.other_check == false){
        this.heading = "No. of Blocks";

      }else if(this.block_check == false && this.slide_check == true && this.other_check == false){
        this.heading = "No. of Slides";
      }else if(this.block_check == false && this.slide_check == false && this.other_check == true){
        
        this.heading = "No. of Bottles";
      }else{
        this.heading = "No. of Bottles /Blocks /Slides";
      }

      
      


     
      if(this.sample[0].dd_no.includes("[")){
       
        this.dd_no=JSON.parse(this.sample[0].dd_no);
        this.dd_no[0].date_of_dd = JSON.parse(JSON.stringify(this.dd_no[0].date_of_dd.formatted));
        
        }else{
         
          console.log(this.sample);
         
          
       }
  
       console.log(this.dd_no[0].dd_no);
       console.log(this.dd_no[0].trans_no)
      if(this.dd_no[0].dd_no != "0"){
     
        this.check_dd = true;
       
        
      }else{
       
        this.check_online = true;
       
      }
      this.sampleArray1=JSON.parse(response[0].sample_test);
     
      if(this.sampleArray.length>0){
       
       }
      },
    (error) =>console.log(error)
    );

    this.isVisible=true;
    this.gethospitaldetails();
    this.hosp_address = sessionStorage.getItem("hosp_address");
  }

  gethospitaldetails()
  {
    this.serverService.gethospitaldetails()
    .subscribe((response)=>{this.hospitaldetails=response
      
    }
    )
  }

  printDiv(){
    
      var printContents = document.getElementById("divForPrint").innerHTML;
    	var originalContents = document.body.innerHTML;
    	document.body.innerHTML = printContents;
    	
    	window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
  }

  

}
