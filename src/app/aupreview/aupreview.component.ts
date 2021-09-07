import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import{ ServerService} from '../server.service';
import { routerTransition } from '../config.service';
import {  Params, ActivatedRoute } from '@angular/router'; 
import 'rxjs/add/operator/switchMap'; 
import { DatePipe } from '@angular/common';
import { AuUser } from '../auuser';
import {Requests} from '../dash-board/requests';

@Component({
  selector: 'app-aupreview',
  templateUrl: './aupreview.component.html',
  styleUrls: ['./aupreview.component.css'],
  providers:[DatePipe]
})
export class AupreviewComponent implements OnInit {

  index:any;
  hospitaldetails:Requests;
  au_sample:AuUser[]=[];
  currentDate=new Date()
  date:any;
  isVisible=true;
  selectedTestArray = [];
  au_priceArray=[];
  testcheckbox1 =false;
  testcheckbox2 =false;
  selectedCheckboxArray = [];
  hosp_type = "";
  hosp_private = true;
  dd_checked = false;
  online_checked = false;
  cash_checked = false;

  
  check1= false;
  check2= false;
  check3= false;
  check4= false;
  check5= false;
  check6= false;
  check7= false;
  check8= false;
  check9= false;

  test1 = false;
  test2 = false;
  test3 = false;
  test4 = false;
  test5 = false;
  test6 = false;
  test7 = false;
  test8 = false;
  test9 = false;

  test1_serum = false;
  test2_serum = false;
  test3_serum = false;
  test4_serum = false;
  test5_serum = false;
  test6_serum = false;
  test7_serum = false;
  test8_serum = false;
  test9_serum = false;
  test3_csf = false;
  test4_csf = false;
  test9_csf = false;

  price_array = [0,0,0,0,0,0,0,0,0];
  others1 =  false;
  others2 =  false;
  others3 =  false;
  others4 =  false;
  others5 = false;
  site1 = false;

  site2 = false;
  cns_checked = false;
  pns_checked = false;
  nmj_checked = false;



  //new_test_array = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
  new_test_array = [[0,0,0],
  [0,0,0],
  [0,0,0,[0,0,0,0,0,0,0,""],[0,0],[0,0,0,0,0,0,0,""],[0,0]],
  [0,0,0,[0,0,0,0,0,0,""],[0,0,""],[0,0]],
  [0,0,0,[0,0,0,0,0,0,0,0],[0,0,0,0],[0,0,0],[0,""],[0,0,""],[0,0]],
  [0,0,0],
  [0,0,0],
  [0,0,0],
  [0,0,0,[0,0,0,0]]];

  test3_col1_option1 = false;
  test3_col1_option2 = false;
  test3_col1_option3 = false;
  test3_col1_option4 = false;
  test3_col1_option5 = false;
  test3_col1_option6 = false;
  test3_col1_option7 = false;
  test3_col1_option7_text = "";

  test3_col2_radio1 = "0"; 
  test3_col2_radio2 = false; 

  test3_col3_option1 = false;
  test3_col3_option2 = false;
  test3_col3_option3 = false;
  test3_col3_option4 = false;
  test3_col3_option5 = false;
  test3_col3_option6 = false;
  test3_col3_option7 = false;
  test3_col3_option7_text = "";

  test3_col4_radio1 = "0"; 

  test4_col1_option1 = false;
  test4_col1_option2 = false;
  test4_col1_option3 = false;
  test4_col1_option4 = false;
  test4_col1_option5 = false;
  test4_col1_option6 = false;
  test4_col1_option6_text = "";
  test4_col2_radio1 = "0";
  test4_yes_text = "";
  test4_col3_radio1 = "0";

  test5_cns_option1 = false;
  test5_cns_option2 = false;
  test5_cns_option3 = false;
  test5_cns_option4 = false;
  test5_cns_option5 = false;
  test5_cns_option6 = false;
  test5_cns_option7 = false;
  test5_col1 = "0";
  
  test5_pns_option1 = false;
  test5_pns_option2 = false;
  test5_pns_option3 = false;

  test5_nmj_option1 = false;
  test5_nmj_option2 = false;
  test5_nmj_option3 = false;
  test5_others_text = "";
  test5_yes_text = "";
  test5_col2_radio1 = "0";
  test5_col3_radio1 = "0";

  test9_col1_option1 = false;
  test9_col1_option2 = false;
  test9_col1_option3 = false;
  test9_col1_option4 = false;


  testArray = [];
  dd_array = [];
  price1 = 0;
  hosp_address = "";
  Test_total_amount = 0;
  test_array1 = [];
  test_array2 = [];
  imgArray=[];
  count = "0";

  constructor(private route: ActivatedRoute,private datePipe: DatePipe,   private serverService:ServerService,private toastr: ToastrService) { 
    {
      this.date = this.datePipe.transform(this.currentDate, 'dd--MM-yyyy');
      }
  }

  ngOnInit() {

    this.hosp_type = sessionStorage.getItem("hosp_type"); 
   // this.hosp_type = "private";
    if(this.hosp_type == "private"){
      this.hosp_private = true;
    }else{
      this.hosp_private = false;
    }

    this.route.params
    .switchMap((params: Params) => this.serverService.getAUDetails(params['au_patient_id']))
    .subscribe((response)=>{this.au_sample=response;
    console.log(response)
      this.dd_array = JSON.parse(this.au_sample[0].au_dd_no);
      console.log(this.dd_array[0].au_dd_no);
      console.log(this.dd_array[0].au_trans_no);
      if(this.dd_array[0].au_dd_no != "" && this.dd_array[0].au_dd_no != undefined){
        this.dd_checked = true;
      }else if(this.dd_array[0].au_trans_no != undefined && this.dd_array[0].au_trans_no != ""){
        this.online_checked = true;
      }else if(this.dd_array[0].au_dd_no == "" || this.dd_array[0].au_dd_no == undefined || this.dd_array[0].au_trans_no == undefined || this.dd_array[0].au_trans_no == ""){
        this.cash_checked = true;
      }


      if(this.dd_array[0].au_date_of_dd ==  undefined){
        this.dd_array[0].au_date_of_dd = "";
      }
    

      this.imgArray= response[0].au_sample_image_url.split(',');
     
      if(this.imgArray.length != null)

     
      if(response[0].au_sample_image_url != null){

        if(this.imgArray.length>1){
        
          response[0].au_sample_image_url =(this.imgArray.length-1).toString();
          this.count = response[0].au_sample_image_url;
          console.log( response[0].au_sample_image_url)
      }else if(this.imgArray.length ==1){
        
        response[0].au_sample_image_url =(this.imgArray.length-1).toString();
        this.count = response[0].au_sample_image_url;
      }
      }else{
      
        response[0].au_sample_image_url = "";
        this.count = "0";
      }

      
      this.testArray=JSON.parse(this.au_sample[0]["test_required"]);

      const chec2 = JSON.parse(response[0].test_required);
      const chec1= JSON.parse(response[0].type_of_sample);
      this.Test_total_amount = response[0].au_amount;
     

      for(var m=0;m<9;m++){
        for(var n=0;n<3;n++){
          this.new_test_array[m][n] = chec2[m][n];
        }
      }

      console.log(chec2[3][3])
      //for displaying back in the preview page
      for(var b1=0;b1<8;b1++){
        this.new_test_array[3][3][b1] = chec2[3][3][b1];
      }
      for(var b2=0;b2<3;b2++){
        this.new_test_array[3][4][b2] = chec2[3][4][b2];
      }
      for(var b3=0;b3<2;b3++){
        this.new_test_array[3][5][b3] = chec2[3][5][b3];
      }
      for(var c1=0;c1<8;c1++){
        this.new_test_array[4][3][c1] = chec2[4][3][c1];
      }
      for(var c2=0;c2<4;c2++){
        this.new_test_array[4][4][c2] = chec2[4][4][c2];
      }
      for(var c3=0;c3<3;c3++){
        this.new_test_array[4][5][c3] = chec2[4][5][c3];
      }
      for(var c4=0;c4<2;c4++){
        this.new_test_array[4][6][c4] = chec2[4][6][c4];
      }
      for(var c5=0;c5<3;c5++){
        this.new_test_array[4][7][c5] = chec2[4][7][c5];
      }
      for(var c6=0;c6<3;c6++){
        this.new_test_array[4][8][c6] = chec2[4][8][c6];
      }
      for(var d1=0;d1<4;d1++){
        this.new_test_array[8][3][d1] = chec2[8][3][d1];
      }




      if(chec2[0][0] === 1){
        this.test1 = true;
       }
       if(chec2[1][0] === 1){
         this.test2 = true;
       }
       if(chec2[2][0] === 1){
         this.test3 = true;
       }
       if(chec2[3][0] === 1){
         this.test4 = true;
       }
       if(chec2[4][0] === 1){
         this.test5 = true;
       }
       if(chec2[5][0] === 1){
         this.test6 = true;
       }
       if(chec2[6][0] === 1){
         this.test7 = true;
       }
       if(chec2[7][0] === 1){
         this.test8 = true;
       }
       if(chec2[8][0] === 1){
         this.test9 = true;
       }


       if(chec2[0][1] === 1){
         this.check1 = true;
         this.test1_serum = true;
         this.Test_total_amount = 0;
         if(this.hosp_private){
          this.price_array[0] = 2700;
          }else{
            this.price_array[0] = 1800;
          }
     for(var i = 0;i<this.price_array.length;i++){
     this.Test_total_amount = this.Test_total_amount + this.price_array[i];
     }
       }

       if(chec2[1][1] === 1){
         this.check2 = true;
         this.test2_serum = true;
          this.Test_total_amount = 0;
          if(this.hosp_private){
            this.price_array[1] = 1200;
             }else{
              this.price_array[1] = 800;
             }
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }
       if(chec2[2][1] === 1){
         this.check3 = true;
         this.test3_serum = true;
         this.Test_total_amount = 0;
         if(this.hosp_private){
          this.price_array[2] = this.price_array[2] + 6000;
          }else{
            this.price_array[2] = this.price_array[2] + 4000;
          }
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }
       if(chec2[3][1] === 1){
         this.check4 = true;
         this.test4_serum = true;
         this.Test_total_amount = 0;
         if(this.hosp_private){
          this.price_array[3] = this.price_array[3] + 8000;
          }else{
            this.price_array[3] = this.price_array[3] + 5300;
          }
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }
       if(chec2[4][1] === 1){
         this.check5 = true;
         this.test5_serum = true;
         this.Test_total_amount = 0;
         if(this.hosp_private){
          this.price_array[4] = 6000;
          }else{
            this.price_array[4] = 4000;
          }
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }
       if(chec2[5][1] === 1){
         this.check6 = true;
         this.test6_serum = true;
         this.Test_total_amount = 0;
         if(this.hosp_private){
          this.price_array[5] = 9000;
          }else{
            this.price_array[5] = 6000;
          }
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }
       if(chec2[6][1] === 1){
         this.check7 = true;
         this.test7_serum = true;
         this.Test_total_amount = 0;
         if(this.hosp_private){
          this.price_array[6] = 3000;
          }else{
            this.price_array[6] = 2000;
          }
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }
       if(chec2[7][1] === 1){
         this.check8 = true;
         this.test8_serum = true;
         this.Test_total_amount = 0;
         if(this.hosp_private){
          this.price_array[7] = 3000;
          }else{
            this.price_array[7] = 2000;
          }
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }
       if(chec2[8][1] === 1){
         this.check9 = true;
         this.test9_serum = true;
         this.Test_total_amount = 0;
         if(this.hosp_private){
          this.price_array[8] = 6000;
          }else{
            this.price_array[8] = 4000;
          }
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }

       if(chec2[2][2] === 1){
         this.check3 = true;
         this.test3_csf = true;
         this.Test_total_amount = 0;
         if(this.hosp_private){
          this.price_array[2] = this.price_array[2] + 6000;
          }else{
            this.price_array[2] = this.price_array[2] + 4000;
          }
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }
       if(chec2[3][2] === 1){
         this.check4 = true;
         this.test4_csf = true;
         this.Test_total_amount = 0;
         if(this.hosp_private){
          this.price_array[3] = this.price_array[3] + 8000;
          }else{
            this.price_array[3] = this.price_array[3] + 5300;
          }
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }
       if(chec2[8][2] === 1){
         this.check9 = true;
         this.test9_csf = true;
         this.Test_total_amount = 0;
         this.price_array[8] = this.price_array[8] + 2700;
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
       }

       //test3 subgroup display
       if(chec2[2].length>4){
      
         if(chec2[2][3][0] === 1){
           this.test3_col1_option1 = true;
         }
         if(chec2[2][3][1] === 1){
           this.test3_col1_option2 = true;
         }
         if(chec2[2][3][2] === 1){
           this.test3_col1_option3 = true;
         }
         if(chec2[2][3][3] === 1){
           this.test3_col1_option4= true;
         }
         if(chec2[2][3][4] === 1){
           this.test3_col1_option5 = true;
         }
         if(chec2[2][3][5] === 1){
           this.test3_col1_option6 = true;
         }
         if(chec2[2][3][6] === 1){
           this.test3_col1_option7 = true;
           this.others1 = true;
           this.test3_col1_option7_text = chec2[2][3][7];
         }

         if(chec2[2][4][0] == 1){
           this.test3_col2_radio1 = "1";
         }else if(chec2[2][4][1] == 1){
           this.test3_col2_radio1 = "2";
         }


        if(chec2[2][5][0] === 1){
         this.test3_col3_option1 = true;
       }
       if(chec2[2][5][1] === 1){
         this.test3_col3_option2 = true;
       }
       if(chec2[2][5][2] === 1){
         this.test3_col3_option3 = true;
       }
       if(chec2[2][5][3] === 1){
         this.test3_col3_option4 = true;
       }
       if(chec2[2][5][4] === 1){
         this.test3_col3_option5 = true;
       }
       if(chec2[2][5][5] === 1){
         this.test3_col3_option6 = true;
       }
       if(chec2[2][5][6] === 1){
         this.test3_col3_option7 = true;
         this.others2 = true;
         this.test3_col3_option7_text = chec2[2][5][7];
       }

       if(chec2[2][6][0] === 1){
         this.test3_col4_radio1 = "1";

       }else  if(chec2[2][6][1] === 1){
         this.test3_col4_radio1 = "2";
         
       }
     }

       

        //test4 subgroup display
        if(chec2[3].length>4){
       
         if(chec2[3][3][0] === 1){
           this.test4_col1_option1 = true;
         }
         if(chec2[3][3][1] === 1){
           this.test4_col1_option2 = true;
         }
         if(chec2[3][3][2] === 1){
           this.test4_col1_option3 = true;
         }
         if(chec2[3][3][3] === 1){
           this.test4_col1_option4 = true;
         }
         if(chec2[3][3][4] === 1){
           this.test4_col1_option5 = true;
         }
         if(chec2[3][3][5] === 1){
           this.test4_col1_option6 = true; 
           this.others4 = true;
           this.test4_col1_option6_text = chec2[3][3][6];
         }

         if(chec2[3][4][0] === 1){
           this.test4_col2_radio1 = "1";
           this.site1 =  true;
           this.test4_yes_text = chec2[3][4][2];
         }else  if(chec2[3][4][1] === 1){
           this.test4_col2_radio1 = "2";
         }

         if(chec2[3][5][0] === 1){
           this.test4_col3_radio1 = "1";
           
         }else  if(chec2[3][5][1] === 1){
           this.test4_col3_radio1 = "2";
         }
       }
     
       //test5 subgroup display
       if(chec2[4].length>4){
       
         if(chec2[4][3][0] === 1){
           this.test5_col1 = "1";
           this.cns_checked = true;
           if(chec2[4][3][1] === 1){
             this.test5_cns_option1 = true;
           }
           if(chec2[4][3][2] === 1){
             this.test5_cns_option2 = true;
           }
           if(chec2[4][3][3] === 1){
             this.test5_cns_option3 = true;
           }
           if(chec2[4][3][4] === 1){
             this.test5_cns_option4 = true;
           }
           if(chec2[4][3][5] === 1){
             this.test5_cns_option5 = true;
           }
           if(chec2[4][3][6] === 1){
             this.test5_cns_option6 = true;
           }
           if(chec2[4][3][7] === 1){
             this.test5_cns_option7 = true;
           }
         }else if(chec2[4][4][0] === 1){
           this.test5_col1 = "2";
           this.pns_checked = true;
           
           if(chec2[4][4][1] === 1){
             this.test5_pns_option1 = true;
           }
           if(chec2[4][4][2] === 1){
             this.test5_pns_option2 = true;
           }
           if(chec2[4][4][3] === 1){
             this.test5_pns_option3 = true;
           }

         }else if(chec2[4][5][0] === 1){
           this.test5_col1 = "3";
           this.nmj_checked = true;
           
           if(chec2[4][5][1] === 1){
             this.test5_nmj_option1 = true;
           }
           if(chec2[4][5][2] === 1){
             this.test5_nmj_option2 = true;
           }
           

         }else if(chec2[4][6][0] === 1){
           this.test5_col1 = "4";
           this.others5 = true;
           this.test5_others_text = chec2[4][6][1];

         }
         if(chec2[4][7][0] === 1){
           this.test5_col2_radio1 = "1";
           this.site2 =  true;
           this.test5_yes_text = chec2[4][7][2];
         }else if(chec2[4][7][1] === 1){
           this.test5_col2_radio1 = "2"
         }

         if(chec2[4][8][0] === 1){
           this.test5_col3_radio1 = "1";
          
         }else if(chec2[4][8][1] === 1){
           this.test5_col3_radio1 = "2"
         }
       }
     
       //test9 subgroup display
       if(chec2[8].length>3){
       if(chec2[8][3][0] === 1){
         this.test9_col1_option1 = true;
       }
       if(chec2[8][3][1] === 1){
         this.test9_col1_option2 = true;
       }
       if(chec2[8][3][2] === 1){
         this.test9_col1_option3 = true;
       }
       if(chec2[8][3][3] === 1){
         this.test9_col1_option4 = true;
       }
     }
      


     for(var i=0;i<this.testArray.length;i++){
       if(this.testArray[i]==0 || this.testArray[i]==4 || this.testArray[i]==5 || this.testArray[i]==6
       || this.testArray[i]==7 || this.testArray[i]==8){
         this.price1 = 2700;       

     }else if(this.testArray[i]==1){
      this.price1 = 1200; 

     }else if(this.testArray[i]==2){
      this.price1 = 6000; 

     }else if(this.testArray[i]==3){
      this.price1 = 3000; 

     }
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


  change(obj){

    let updateItem = this.selectedCheckboxArray.find(this.findIndexToUpdate, obj.id);
    let index = this.selectedCheckboxArray.indexOf(updateItem);

    if(index > -1){
      this.selectedCheckboxArray.splice(index, 1);
    }
    else{
      this.selectedCheckboxArray.push(obj);
    }

    this.test_array1 = [];
    for(var i=0;i<this.selectedCheckboxArray.length;i++){
      this.test_array1.push(this.selectedCheckboxArray[i].id);
     
     }

    if(this.selectedCheckboxArray.length>0){
      this.testcheckbox1=true;
     }

    
  }

  findIndexToUpdate(obj) { 
        return obj.id === this;
  }
  change1(obj){

    let updateItem = this.selectedTestArray.find(this.findIndexToUpdate1, obj.id);
    let index = this.selectedTestArray.indexOf(updateItem);
   
    if(index > -1){
      this.selectedTestArray.splice(index, 1);
      
    }
    else{
      this.selectedTestArray.push(obj);
     
    }

this.Test_total_amount = 0;
this.test_array2 = [];
for(var i=0;i<this.selectedTestArray.length;i++){
 this.Test_total_amount = this.Test_total_amount + this.selectedTestArray[i].price;
 this.test_array2.push(this.selectedTestArray[i].id);

}
   
    if(this.selectedTestArray.length>0){
      this.testcheckbox2=true;
     }

  }

  findIndexToUpdate1(obj) { 
    return obj.id === this;
}

}
