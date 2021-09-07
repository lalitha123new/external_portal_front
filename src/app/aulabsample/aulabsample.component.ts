import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { AuUser } from '../auuser';
import {  Params } from '@angular/router'; 

import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import {ServerService} from '../server.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import {IMyDpOptions} from 'mydatepicker';

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
@Component({
  selector: 'app-aulabsample',
  templateUrl: './aulabsample.component.html',
  styleUrls: ['./aulabsample.component.css']
})


export class AulabsampleComponent implements OnInit {

  public testArray: Array<any>=[];
  userList: AuUser ={} as any;
  au_sampleList : AuUser={} as any;
  public dd_obj: any = {};
  public dd_no: Array<any>=[];
  form : FormGroup;  
  selectedCheckboxArray = [];
  index:any;
  selectedTestArray = [];
  au_priceArray=[];

  testcheckbox1 = false;
  testcheckbox2 =false;
  Test_total_amount = 0;
  test_array1 = [];
  test_array2 = [];
  test_Check2:any;
  check_online=true;
  check_dd = false;
  hosp_address = "";
  hosp_type = "";
  hosp_private = true;
  

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
  checkAmount = false;

  new_test_array = [[0,0,0],
  [0,0,0],
  [0,0,0,[0,0,0,0,0,0,0,""],[0,0],[0,0,0,0,0,0,0,""],[0,0]],
  [0,0,0,[0,0,0,0,0,0,""],[0,0,""],[0,0]],
  [0,0,0,[0,0,0,0,0,0,0,0],[0,0,0,0],[0,0,0],[0,""],[0,0,""],[0,0]],
  [0,0,0],
  [0,0,0],
  [0,0,0],
  [0,0,0,[0,0,0,0]]];
  selectedFile: File[] = [];
  selectedFile1: File[] = [];
  x = 0;
  cash_payment = false;
  isChecked1 =  false;
  isChecked2 =  false;
  isChecked3 =  false;
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

  public obj: any = {};
  checkImgSrc = 0;


  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };

  constructor(private serverService: ServerService,private formBuilder: FormBuilder,private route: ActivatedRoute,
    private router: Router,private toastr: ToastrService) {
      this.route.params.subscribe(params => {
        this.index = params['au_patient_id'];
        
        // check if ID exists in route & call update or add methods accordingly
        if (this.index && this.index != null && this.index != undefined) {
          this.getDetails(this.index);
        }else{
          this.createForm(null);
        }
      });
    }

    //to get the sample details and display in the add/update page
    //if data is null add sample, else, update sample
    getDetails(index:number){
      this.route.params
    .switchMap((params: Params) => this.serverService.getAUDetails(params['au_patient_id']))
    .subscribe((response)=>{this.au_sampleList=response;
     
      this.createForm(response);
      console.log(response)
      this.dd_no=JSON.parse(response[0].au_dd_no);
      this.dd_obj.dd_no=this.dd_no[0].dd_no;
      this.dd_obj.trans_no=this.dd_no[0].trans_no;
      this.dd_obj.bank_name=this.dd_no[0].bank_name;
      this.dd_obj.date_of_dd=this.dd_no[0].date_of_dd;
      const chec2 = JSON.parse(response[0].test_required);
      const chec1= JSON.parse(response[0].type_of_sample);

     
     
      //for displaying the checkbox with checked or unchecked in the edit form
      for(var m=0;m<9;m++){
        for(var n=0;n<3;n++){
          this.new_test_array[m][n]= chec2[m][n];
        }
      }

       //for displaying the test3 subgroups  edit form and in the object
      for(var a1=0;a1<8;a1++){
        this.new_test_array[2][3][a1] = chec2[2][3][a1];
      }
      for(var a2=0;a2<2;a2++){
        this.new_test_array[2][4][a2] = chec2[2][4][a2];
      }
      for(var a3=0;a3<8;a3++){
        this.new_test_array[2][5][a3] = chec2[2][5][a3];
      }
      for(var a4=0;a4<2;a4++){
        this.new_test_array[2][6][a4] = chec2[2][6][a4];
      }
      
    
     //for displaying test4 subgroups in the edit form and in the object
      for(var b1=0;b1<8;b1++){
        this.new_test_array[3][3][b1] = chec2[3][3][b1];
      }
      for(var b2=0;b2<3;b2++){
        this.new_test_array[3][4][b2] = chec2[3][4][b2];
      }
      for(var b3=0;b3<2;b3++){
        this.new_test_array[3][5][b3] = chec2[3][5][b3];
      }

      //for displaying test5 subgroups in the edit form and in the object
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
      for(var c6=0;c6<2;c6++){
        this.new_test_array[4][8][c6] = chec2[4][8][c6];
      }


      //for displaying test9 subgroups in the edit form and in the object
      for(var d1=0;d1<4;d1++){
        this.new_test_array[8][3][d1] = chec2[8][3][d1];
        console.log(this.new_test_array)
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


          console.log(typeof chec2[2][4][0]);
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
          //console.log(chec2[3]);
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
         
      this.test_array1 = JSON.parse(response[0].type_of_sample);
      console.log(response[0]);
      
      
      },
    (error) =>console.log(error)
    );
  
    }
createForm(data){
  
   //if data is null add sample, else, update sample
  if(data===null){
    this.hosp_address = sessionStorage.getItem("hosp_address");
    
   
    this.form=new FormGroup({
      au_pat_name: new FormControl('', [Validators.required]),
      au_pat_age: new FormControl('', [Validators.required]),
      au_pat_gender: new FormControl('', [Validators.required]),
      au_referred_by: new FormControl('',[Validators.required]),
      au_doctor_phone_no:new FormControl('', [Validators.required]),
      au_doctor_email_id:new FormControl('',[Validators.required]),
      au_amount:new FormControl('', []), 
      au_clinic_history: new FormControl('',[Validators.required]),
      au_hosp_ref_no:new FormControl('',[Validators.required]),
      au_pat_phno:new FormControl('',[Validators.required]),
      au_pat_email:new FormControl('',[Validators.required]),
      au_dd_no:new FormControl('',[Validators.required]),
      au_trans_no:new FormControl('',[Validators.required]),
      au_bank_name:new FormControl('',[Validators.required]),
      au_date_of_dd:new FormControl('',[Validators.required]),
      au_remarks:new FormControl('',[])
      
    });
  }else{
    sessionStorage.setItem("addAuSample","false");
    this.hosp_address = sessionStorage.getItem("hosp_address");
    let obj = JSON.parse(data[0].au_dd_no);
  
    this.form=new FormGroup({
      au_pat_name:new FormControl (data[0].au_pat_name, [Validators.required]),
      au_pat_age: new FormControl (data[0].au_pat_age, [Validators.required]),
      au_pat_gender: new FormControl (data[0].au_pat_gender, [Validators.required]),
      au_referred_by: new FormControl (data[0].au_referred_by,[Validators.required]),
      au_doctor_phone_no:new FormControl(data[0].au_doctor_phone_no, [Validators.required]),
      au_doctor_email_id:new FormControl(data[0].au_doctor_email_id,[Validators.required]),
      au_amount:new FormControl(data[0].au_amount, []),
      au_clinic_history:new FormControl(data[0].au_clinic_history,[Validators.required]),
      au_hosp_ref_no:new FormControl(data[0].au_hosp_ref_no,[Validators.required]),
      au_pat_phno:new FormControl(data[0].au_pat_phno,[Validators.required]),
      au_pat_email:new FormControl(data[0].au_pat_email,[Validators.required]),
      au_dd_no:new FormControl(obj[0].au_dd_no,[Validators.required]),
      au_trans_no:new FormControl(obj[0].au_trans_no,[Validators.required]),
      au_bank_name:new FormControl(obj[0].au_bank_name,[Validators.required]),
      au_date_of_dd:new FormControl(obj[0].au_date_of_dd,[Validators.required]),
      au_remarks:new FormControl(data[0].au_remarks,[])
    });

   
    if(obj[0].au_dd_no != "" && obj[0].au_dd_no != undefined && obj[0].au_dd_no != "0"){
      this.isChecked1 = true;
   
      }else if(obj[0].au_trans_no != "" && obj[0].au_trans_no != undefined && obj[0].au_trans_no != "0"){
   this.isChecked2 = true;

   }else if(obj[0].au_dd_no == "" &&  obj[0].au_trans_no == ""){
    this.isChecked3 = true;

    this.check_dd =  false;
    this.dd_obj.au_trans_no = "";

    this.check_online = false;
    this.dd_obj.au_dd_no = "";

    this.form.controls['au_dd_no'].disable();
    this.form.controls['au_bank_name'].disable();
    this.form.controls['au_trans_no'].disable();
    this.form.controls['au_date_of_dd'].disable();
    this.cash_payment =  true;
   }
    this.testcheckbox1=true;
    this.testcheckbox2=true;
    this.checkAmount = true;
   
    this.dd_obj.au_dd_no =  obj[0].au_dd_no;
    
    this.dd_obj.au_trans_no =  obj[0].au_trans_no;
     
    this.dd_obj.au_bank_name =  obj[0].au_bank_name;  
    this.dd_obj.au_date_of_dd =  obj[0].au_date_of_dd;  
    
   
  }
    
  }
 
  ngOnInit() {
    this.hosp_type = sessionStorage.getItem("hosp_type"); 
    sessionStorage.setItem("addAuSample","true");
   
    if(this.hosp_type == "private"){
      this.hosp_private = true;
    }else{
      this.hosp_private = false;
    }
  }

  home(){
    this.router.navigate(['aulab']);
  }

  onFileSelected(event) {
    for (var i = 0; i < event.target.files.length; i++)
      this.selectedFile[this.x++] = <File>event.target.files[i];
  }

  onUpload(checkImgSrc) {
    console.log(checkImgSrc);
    this.serverService.sendAUImages(this.selectedFile, checkImgSrc)
      .subscribe(res => {
        //console.log("imageResponce--"+res);
      });
    this.x = 0;
  }

  addAUPatient(form : any){
    this.dd_no =  [];
   
    this.dd_no.push(this.dd_obj);
    this.dd_obj = {};
    this.obj = {
      version:"0.1"
    }
   
    this.new_test_array.push(this.obj);

    //if data is already there then update sample, else add sample
    if (this.index && this.index != null && this.index != undefined) {
      
      // if(this.form.value.au_pat_name && this.form.value.au_pat_age && this.form.value.au_pat_gender && this.form.value.au_hosp_ref_no
      //   && this.form.value.au_referred_by && this.form.value.au_doctor_phone_no && this.form.value.au_doctor_email_id &&
      //   this.form.value.au_pat_phno &&  this.form.value.au_pat_email &&  this.form.value.au_clinic_history &&
      //   this.new_test_array.length > 0 && ((this.form.value.au_dd_no || this.form.value.au_trans_no) && this.form.value.au_bank_name
      //   && this.form.value.au_amount > 0 && this.form.value.au_date_of_dd && this.selectedFile.length > 0) || this.cash_payment ){

        if(!this.form.value.au_pat_name){
          alert("Please fill in Patient Name");
          
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(!this.form.value.au_pat_age){
          alert("Please fill in patient age");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(!this.form.value.au_pat_gender){
          alert("Please fill in Patient Gender");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(!this.form.value.au_hosp_ref_no){
          alert("Please fill in Referring Hospital Patient Id");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_referred_by){
          alert("Please fill in Referred_by");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_doctor_phone_no){
          alert("Please fill in Consultant Mobile Number");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_doctor_email_id){
          alert("Please fill in Consultant E-mail Address");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_pat_phno){
          alert("Please fill in Patient Mobile Number");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_pat_email){
          alert("Please fill in Patient E-mail Address");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_clinic_history){
          alert("Please fill in Clinical Details");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        } else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][1] == 0 && this.new_test_array[2][2] == 0)){
          alert("Please select Serum or CSF in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][3][0] == 0 && this.new_test_array[2][3][1] == 0 && this.new_test_array[2][3][2] == 0
          && this.new_test_array[2][3][3] == 0 && this.new_test_array[2][3][4] == 0 && this.new_test_array[2][3][5] == 0 && this.new_test_array[2][3][6] == 0)){
          alert("Please select option under NMOSD in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][3][6] == 1 && this.new_test_array[2][3][7] == "" )){
          alert("Please enter details under If None of the above option under NMOSD in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][4][0] == 0 && this.new_test_array[2][4][1] == 0 )){
          alert("Please select option under Current Clinical Status in second column in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][5][0] == 0 && this.new_test_array[2][5][1] == 0 && this.new_test_array[2][5][2] == 0 &&
          this.new_test_array[2][5][3] == 0 && this.new_test_array[2][5][4] == 0 && this.new_test_array[2][5][5] == 0 &&
          this.new_test_array[2][5][6] == 0)){
          alert("Please select option under MOGAD in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][5][6] == 1 && this.new_test_array[2][5][7] == "")){
          alert("Please enter details under None of the above under MOGAD in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][6][0] == 0 && this.new_test_array[2][6][1] == 0)){
          alert("Please select option under Current Clinical Status in fourth column in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][1] == 0 && this.new_test_array[3][2] == 0)){
          alert("Please select Serum or CSF in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][3][0] == 0 && this.new_test_array[3][3][1] == 0 && this.new_test_array[3][3][2] == 0 &&
          this.new_test_array[3][3][3] == 0 && this.new_test_array[3][3][4] == 0 && this.new_test_array[3][3][5] == 0)){
          alert("Please select  option under Clinical Syndrome under Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][3][5] == 1 && this.new_test_array[3][3][6] == "")){
          alert("Please enter details under None of the above option under Clinical Syndrome in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][4][0] == 0 && this.new_test_array[3][4][1] == 0)){
          alert("Please select option under Known Malignancy in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][4][0] == 1 && this.new_test_array[3][4][2] == "")){
          alert("Please enter details under Known Malignancy in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][5][0] == 0 && this.new_test_array[3][5][1] == 0)){
          alert("Please select option under Current Clinical Status in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && (this.new_test_array[4][3][0] == 0 && this.new_test_array[4][4][0] == 0 && this.new_test_array[4][5][0] == 0 &&
          this.new_test_array[4][6][0] == 0)){
          alert("Please select option under Clinical Syndrome in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && this.new_test_array[4][3][0] == 1 && (this.new_test_array[4][3][1] == 0 && this.new_test_array[4][3][2] == 0 && this.new_test_array[4][3][3] == 0 
          && this.new_test_array[4][3][4] == 0 && this.new_test_array[4][3][5] == 0 && this.new_test_array[4][3][6] == 0 && this.new_test_array[4][3][7] == 0)){
          alert("Please select option Under CNS in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && this.new_test_array[4][4][0] == 1 && (this.new_test_array[4][4][1] == 0 && this.new_test_array[4][4][2] == 0 && this.new_test_array[4][4][3] == 0)){
          alert("Please select option under PNS in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && this.new_test_array[4][5][0] == 1 && (this.new_test_array[4][5][1] == 0 && this.new_test_array[4][5][2] == 0)){
          alert("Please select option Under NMJ in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && this.new_test_array[4][6][0] == 1 && (this.new_test_array[4][6][1] == "")){
          alert("Please enter details under None of the above Under Clinical Syndrome in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && (this.new_test_array[4][7][0] == 0 && this.new_test_array[4][7][1] == 0)){
          alert("Please select option under Known Malignancy in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && (this.new_test_array[4][7][0] == 1 && this.new_test_array[4][7][2] == "")){
          alert("Please enter details under Known Malignancy in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && (this.new_test_array[4][8][0] == 0 && this.new_test_array[4][8][1] == 0)){
          alert("Please select option under Current Clinical Status in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[8][0] == 1 && (this.new_test_array[8][3][0] == 0 && this.new_test_array[8][3][1] == 0 && this.new_test_array[8][3][2] == 0 
          && this.new_test_array[8][3][3] == 0)){
          alert("Please select option under DPPX in Test 9");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.form.value.au_amount < 1){
          alert("Please select option under Tests Required");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if((this.form.value.au_dd_no == undefined || this.form.value.au_dd_no == "") && (this.form.value.au_trans_no == undefined || this.form.value.au_trans_no == "") && this.cash_payment == false){
          alert("Please select Payment Mode and fill in associated fields");
          console.log(this.form.value.au_dd_no);
          console.log(this.form.value.au_trans_no);
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.form.value.au_dd_no && (this.form.value.au_bank_name == undefined || this.form.value.au_bank_name == "" || this.form.value.au_date_of_dd == undefined)){
          alert("Please fill in Bank Name, DD Date and Transaction File Upload");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;  
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.form.value.au_trans_no && (this.form.value.au_bank_name == undefined || this.form.value.au_bank_name == "" || this.form.value.au_date_of_dd == undefined)){
          alert("Please fill in Bank Name, Transaction Date and Transaction File Upload");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else{
    this.userList=this.form.value;
    console.log(this.userList)
    this.userList.username=sessionStorage.getItem(name);
    this.userList.hospitalid = Number(sessionStorage.getItem("hospital_id"));
    //this.userList.address = "";
    this.userList.date_of_sample = "";
    this.userList.au_patient_id =  this.index;
    this.test_array1 = [0];
    this.userList["type_of_sample"]=JSON.stringify(this.test_array1);
    //this.userList["test_required"]=JSON.stringify(this.test_array2);
    this.userList["test_required"] = JSON.stringify(this.new_test_array);
    this.userList["au_dd_no"]=JSON.stringify(this.dd_no);
    console.log(this.userList);
    
    this.serverService.UpdateAUUser(this.userList)
    .subscribe(
      (response) =>{
        
      
        this.router.navigateByUrl('/aulab')
        this.onUpload(3);
        this.toastr.success('Success', "Patient updated successfully",{
          positionClass: 'toast-bottom-center' 
       });

      },
        (error) =>console.log(error)
    );
        }
        // else{
        //   alert("Please fill in all mandatory fields");
        //   this.dd_obj.au_dd_no = this.form.value.au_dd_no;
        //   this.dd_obj.au_trans_no = this.form.value.au_trans_no;
        //   this.dd_obj.au_bank_name = this.form.value.au_bank_name;
        //   this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        // }

    }else{
     
    this.index = null;

    // if(this.form.value.au_pat_name && this.form.value.au_pat_age && this.form.value.au_pat_gender && this.form.value.au_hosp_ref_no
    //   && this.form.value.au_referred_by && this.form.value.au_doctor_phone_no && this.form.value.au_doctor_email_id &&
    //   this.form.value.au_pat_phno &&  this.form.value.au_pat_email &&  this.form.value.au_clinic_history &&
    //   this.new_test_array.length > 0 && ((this.form.value.au_dd_no || this.form.value.au_trans_no) && this.form.value.au_bank_name
    //   && this.form.value.au_amount > 0 && this.form.value.au_date_of_dd && this.selectedFile.length > 0) || this.cash_payment){
   
        if(!this.form.value.au_pat_name){
          alert("Please fill in Patient Name");
          
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(!this.form.value.au_pat_age){
          alert("Please fill in Patient Age");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(!this.form.value.au_pat_gender){
          alert("Please fill in Patient Gender");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(!this.form.value.au_hosp_ref_no){
          alert("Please fill in Referring Hospital Patient Id");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_referred_by){
          alert("Please fill in Referred_by");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_doctor_phone_no){
          alert("Please fill in Consultant Mobile Number");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_doctor_email_id){
          alert("Please fill in Consultant E-mail Address");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_pat_phno){
          alert("Please fill in Patient Mobile Number");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_pat_email){
          alert("Please fill in Patient E-mail Address");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(! this.form.value.au_clinic_history){
          alert("Please fill in Clinical Details");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        } else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][1] == 0 && this.new_test_array[2][2] == 0)){
          alert("Please select Serum or CSF in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][3][0] == 0 && this.new_test_array[2][3][1] == 0 && this.new_test_array[2][3][2] == 0
          && this.new_test_array[2][3][3] == 0 && this.new_test_array[2][3][4] == 0 && this.new_test_array[2][3][5] == 0 && this.new_test_array[2][3][6] == 0)){
          alert("Please select option under NMOSD in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][3][6] == 1 && this.new_test_array[2][3][7] == "" )){
          alert("Please enter details under None of the above under NMOSD in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][4][0] == 0 && this.new_test_array[2][4][1] == 0 )){
          alert("Please select option under Current Clinical Status in second column in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][5][0] == 0 && this.new_test_array[2][5][1] == 0 && this.new_test_array[2][5][2] == 0 &&
          this.new_test_array[2][5][3] == 0 && this.new_test_array[2][5][4] == 0 && this.new_test_array[2][5][5] == 0 &&
          this.new_test_array[2][5][6] == 0)){
          alert("Please select option under MOGAD in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][5][6] == 1 && this.new_test_array[2][5][7] == "")){
          alert("Please enter details under None of the above under MOGAD in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[2][0] == 1 && (this.new_test_array[2][6][0] == 0 && this.new_test_array[2][6][1] == 0)){
          alert("Please select option under Current Clinical Status in fourth column in Test 3");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][1] == 0 && this.new_test_array[3][2] == 0)){
          alert("Please select Serum or CSF in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][3][0] == 0 && this.new_test_array[3][3][1] == 0 && this.new_test_array[3][3][2] == 0 &&
          this.new_test_array[3][3][3] == 0 && this.new_test_array[3][3][4] == 0 && this.new_test_array[3][3][5] == 0)){
          alert("Please select option under Clinical Syndrome in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][3][5] == 1 && this.new_test_array[3][3][6] == "")){
          alert("Please enter details under None of the above under Clinical Syndrome in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][4][0] == 0 && this.new_test_array[3][4][1] == 0)){
          alert("Please select option under Known Malignancy in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][4][0] == 1 && this.new_test_array[3][4][2] == "")){
          alert("Please enter details under None of the above under Known Malignancy in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[3][0] == 1 && (this.new_test_array[3][5][0] == 0 && this.new_test_array[3][5][1] == 0)){
          alert("Please select option under Current Clinical Status in Test 4");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && (this.new_test_array[4][3][0] == 0 && this.new_test_array[4][4][0] == 0 && this.new_test_array[4][5][0] == 0 &&
          this.new_test_array[4][6][0] == 0)){
          alert("Please select option under Clinical Syndrome in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && this.new_test_array[4][3][0] == 1 && (this.new_test_array[4][3][1] == 0 && this.new_test_array[4][3][2] == 0 && this.new_test_array[4][3][3] == 0 
          && this.new_test_array[4][3][4] == 0 && this.new_test_array[4][3][5] == 0 && this.new_test_array[4][3][6] == 0)){
          alert("Please select option under CNS in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && this.new_test_array[4][4][0] == 1 && (this.new_test_array[4][4][1] == 0 && this.new_test_array[4][4][2] == 0 && this.new_test_array[4][4][3] == 0)){
          alert("Please select under PNS in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && this.new_test_array[4][5][0] == 1 && (this.new_test_array[4][5][1] == 0 && this.new_test_array[4][5][2] == 0)){
          alert("Please select under NMJ in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && this.new_test_array[4][6][0] == 1 && (this.new_test_array[4][6][1] == "")){
          alert("Please enter details under None of the above under Clinical Syndrome in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && (this.new_test_array[4][7][0] == 0 && this.new_test_array[4][7][1] == 0)){
          alert("Please select option under Known Malignancy in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && (this.new_test_array[4][7][0] == 1 && this.new_test_array[4][7][2] == "")){
          alert("Please enter details under None of the above under Known Malignancy in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[4][0] == 1 && (this.new_test_array[4][8][0] == 0 && this.new_test_array[4][8][1] == 0)){
          alert("Please select option under Current Clinical Status in Test 5");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.new_test_array[8][0] == 1 && (this.new_test_array[8][3][0] == 0 && this.new_test_array[8][3][1] == 0 && this.new_test_array[8][3][2] == 0 
          && this.new_test_array[8][3][3] == 0)){
          alert("Please select option under DPPX in Test 9");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.form.value.au_amount < 1){
          alert("Please select option under Tests Required");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if((this.form.value.au_dd_no == undefined || this.form.value.au_dd_no == "") && (this.form.value.au_trans_no == undefined || this.form.value.au_trans_no == "") && this.cash_payment == false){
          alert("Please select Payment Mode and fill in associated fields");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.form.value.au_dd_no && (this.form.value.au_bank_name == undefined || this.form.value.au_bank_name == "" || this.form.value.au_date_of_dd == undefined || this.selectedFile.length < 1)){
          alert("Please fill in Bank Name, DD Date and Transaction File Upload");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;  
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else if(this.form.value.au_trans_no && (this.form.value.au_bank_name == undefined || this.form.value.au_bank_name == "" || this.form.value.au_date_of_dd == undefined || this.selectedFile.length < 1)){
          alert("Please fill in Bank Name, Tranaction Date and Transaction File Upload");
          this.dd_obj.au_dd_no = this.form.value.au_dd_no;
          this.dd_obj.au_trans_no = this.form.value.au_trans_no;
          this.dd_obj.au_bank_name = this.form.value.au_bank_name;
          this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
        }else{
         
    this.userList=this.form.value;
    this.userList.username=sessionStorage.getItem(name);
    this.userList.hospitalid = Number(sessionStorage.getItem("hospital_id"));
    //this.userList.address = "";
    this.userList.date_of_sample = "";
    this.test_array1 = [0];
    this.userList["type_of_sample"]=JSON.stringify(this.test_array1);
    //this.userList["test_required"]=JSON.stringify(this.test_array2);
    this.userList["test_required"] = JSON.stringify(this.new_test_array);
    
    this.userList["au_dd_no"]=JSON.stringify(this.dd_no);
  
    this.serverService.storeAUUser(this.userList)
    .subscribe(
      (response) =>{
        this.router.navigateByUrl('/aulab')
        this.onUpload(3);
        this.toastr.success('Success', "Patient added successfully",{
          positionClass: 'toast-bottom-center' 
       });

      },
        (error) =>console.log(error)
    );
      }
      // else{
      //   alert("Please fill in all mandatory fields");
      //   this.dd_obj.au_dd_no = this.form.value.au_dd_no;
      //   this.dd_obj.au_trans_no = this.form.value.au_trans_no;
      //   this.dd_obj.au_bank_name = this.form.value.au_bank_name;
      //   this.dd_obj.au_date_of_dd = this.form.value.au_date_of_dd;
      // }
  }
}



  
  toggle1(){

    this.check_online = true;
    this.check_dd =  false;
    this.dd_obj.au_trans_no = ""
   
   
    this.form.controls['au_dd_no'].enable();
    this.form.controls['au_bank_name'].enable();
    this.form.controls['au_trans_no'].disable();
    this.form.controls['au_date_of_dd'].enable();
    this.cash_payment = false;
  

  }

  // if transaction check box is selected
  toggle2(){

    this.check_online = false;
    this.check_dd =  true;
    
    this.dd_obj.au_dd_no = "";
    console.log(  this.dd_obj.dd_no);
    this.form.controls['au_trans_no'].enable();
    this.form.controls['au_dd_no'].disable();
    this.form.controls['au_bank_name'].enable();
    this.form.controls['au_date_of_dd'].enable();
    this.cash_payment = false;
 

}

toggle3(){

  this.check_online = false;
  this.check_dd =  false;
  
  this.dd_obj.au_dd_no = "";
  this.dd_obj.au_trans_no = "";
  this.dd_obj.au_bank_name = "";
  this.dd_obj.au_date_of_dd = "";
 
  this.form.controls['au_trans_no'].disable();
  this.form.controls['au_dd_no'].disable();
  this.form.controls['au_bank_name'].disable();
  this.form.controls['au_date_of_dd'].disable();
  this.cash_payment = true;


}


//first checkbox options for for tests 
//second checkbox options are subtests like serum, csf
//tests 1,2,5,6,7,8,9 have subtest serum only, so when click on test checkbox it will display serum(checked) and also adds the price automatically
//tests 3 and 4 have subtest serum and csf, user is able to check either serum or csf or both and total amount is calculated based on selecting that
//when the user unchecks the test for 3 and 4, subtests are also unchecked and hidden and has the change in total amount also
//in the edit form, if the user unchecks all tests(but in the response data,as there is checked tests), we are checking the total amoount to validate the
//the form, if the total amount is greater than 0, user is able to submit
test_new1(event: any){
 this.new_test_array[0][0] = parseInt(event);
 this.Test_total_amount = 0;

 this.new_test_array[0][1] = parseInt(event);
  this.testcheckbox2 = true;

 if(event== 1){
 this.check1 = true;
 this.testcheckbox1 = true;
 this.test1_serum =  true;
 if(this.hosp_private){
 this.price_array[0] = 2700;
 }else{
  this.price_array[0] = 1800;
 }
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }

 }else if(event== 0){
  this.check1 = false;
  this.test1_serum =  false;
  this.price_array[0] = 0;
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount +  this.price_array[i];
  }
  
 }

 if(this.Test_total_amount == 0){
  this.checkAmount = false;
}else{
  this.checkAmount = true;
}
}


test_new2(event: any){
 this.new_test_array[1][0] = parseInt(event);
 this.new_test_array[1][1] = parseInt(event);
  this.testcheckbox2 = true;
  
  this.Test_total_amount = 0;
 if(event== 1){
  this.check2 = true;
  this.test2_serum = true;
  this.testcheckbox1 = true;
  if(this.hosp_private){
  this.price_array[1] = 1200;
  }else{
    this.price_array[1] = 800;
  }
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }
  }else if(event== 0){
   this.check2 = false;
   this.test2_serum = false;
   this.price_array[1] = 0;
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount + this.price_array[i];
  }
  }

  if(this.Test_total_amount == 0){
    this.checkAmount = false;
  }else{
    this.checkAmount = true;
  }

}

test_new3(event: any){
  this.new_test_array[2][0] = parseInt(event);

  this.test3_col1_option1 = false;
  this.test3_col1_option2 = false;
  this.test3_col1_option3 = false;
  this.test3_col1_option4 = false;
  this.test3_col1_option5 = false;
  this.test3_col1_option6 = false;
  this.test3_col1_option7 = false;
  this.test3_col1_option7_text = "";

  this.test3_col2_radio1 = "0"; 
  this.test3_col2_radio2 = false; 
  
  this.test3_col3_option1 = false;
  this.test3_col3_option2 = false;
  this.test3_col3_option3 = false;
  this.test3_col3_option4 = false;
  this.test3_col3_option5 = false;
  this.test3_col3_option6 = false;
  this.test3_col3_option7 = false;
  this.test3_col3_option7_text = "";

  this.test3_col4_radio1 = "0"; 

  for(var a1=0;a1<7;a1++){
    this.new_test_array[2][3][a1] = false;
    this.others1 = false;
    this.new_test_array[2][3][7] = "";
    
  }
  for(var a2=0;a2<2;a2++){
    this.new_test_array[2][4][a2] = 0;
  }
  for(var a3=0;a3<7;a3++){
    this.new_test_array[2][5][a3] = 0;
    this.others2 = false;
    this.new_test_array[2][5][7] = "";
  }
  for(var a4=0;a4<2;a4++){
    this.new_test_array[2][6][a4] = 0;
  }
  

  if(event== 1){
    this.check3 = true;
    

    }else if(event== 0){
      console.log("check test3")
      
      if(this.new_test_array[2][1] == 1){ 
      
       this.Test_total_amount = 0;
        this.new_test_array[2][1] = 0;
        this.test3_serum = false;
        this.price_array[2] = 0;
        for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
        }

      }

      
      if(this.new_test_array[2][2] == 1){ 
       
        this.Test_total_amount = 0; 
        this.new_test_array[2][2] = 0;
        this.test3_csf = false;
       this.price_array[2] = 0;
        for(var i = 0;i<this.price_array.length;i++){
        this.Test_total_amount = this.Test_total_amount + this.price_array[i];
        }

      }

     this.check3 = false;
    
console.log(this.new_test_array[2][3]);
     
    }

    if(this.Test_total_amount == 0){
      this.checkAmount = false;
    }else{
      this.checkAmount = true;
    }
 }


 test_new4(event: any){
  this.new_test_array[3][0] = parseInt(event);

  this.test4_col1_option1 = false;
  this.test4_col1_option2 = false;
  this.test4_col1_option3 = false;
  this.test4_col1_option4 = false;
  this.test4_col1_option5 = false;
  this.test4_col1_option6 = false;
  this.test4_col1_option6_text = "";
  this.test4_col2_radio1 = "0";
  this.test4_yes_text = "";
  this.test4_col3_radio1 = "0";

  for(var b1=0;b1<7;b1++){
    this.new_test_array[3][3][b1] = 0;
    this.others4 = false;
    this.new_test_array[3][3][7] = "";
  }
  for(var b2=0;b2<2;b2++){
    this.new_test_array[3][4][b2] = 0;
    this.site1 =  false;
    this.new_test_array[3][4][2] = "";
  }
  for(var b3=0;b3<2;b3++){
    this.new_test_array[3][5][b3] = 0;
  }

  if(event== 1){
    this.check4 = true;
    }else if(event== 0){

      if(this.new_test_array[3][1] == 1){ 
       
        this.Test_total_amount = 0;
         this.new_test_array[3][1] = 0;
         this.test4_serum = false;
         this.price_array[3] = 0;
         for(var i = 0;i<this.price_array.length;i++){
          this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
 
       }
 
       
       if(this.new_test_array[3][2] == 1){ 
        
         this.Test_total_amount = 0; 
         this.new_test_array[3][2] = 0;
         this.test4_csf = false;
        this.price_array[3] = 0;
         for(var i = 0;i<this.price_array.length;i++){
         this.Test_total_amount = this.Test_total_amount + this.price_array[i];
         }
 
       }

     this.check4 = false;
     
    }

    if(this.Test_total_amount == 0){
      this.checkAmount = false;
    }else{
      this.checkAmount = true;
    }
 }
 test_new5(event: any){

  this.new_test_array[4][0] = parseInt(event);
  this.new_test_array[4][1] = parseInt(event);
  this.testcheckbox2 = true;
  
  this.Test_total_amount = 0;
  this.test5_cns_option1 = false;
  this.test5_cns_option2 = false;
  this.test5_cns_option3 = false;
  this.test5_cns_option4 = false;
  this.test5_cns_option5 = false;
  this.test5_cns_option6 = false;
  this.test5_cns_option7 = false;
  this.test5_col1 = "0";
  

  this.test5_pns_option1 = false;
  this.test5_pns_option2 = false;
  this.test5_pns_option3 = false;

  this.test5_nmj_option1 = false;
  this.test5_nmj_option2 = false;
  this.test5_nmj_option3 = false;
  this.test5_others_text = "";
  this.test5_yes_text = "";
  this.test5_col2_radio1 = "0";
  this.test5_col3_radio1 = "0";

   for(var c1=0;c1<8;c1++){
        this.new_test_array[4][3][c1] = 0;
      }
      for(var c2=0;c2<4;c2++){
        this.new_test_array[4][4][c2] = 0;
      }
      for(var c3=0;c3<3;c3++){
        this.new_test_array[4][5][c3] = 0;
      }
      for(var c4=0;c4<2;c4++){
        this.new_test_array[4][6][0] = 0;
        this.others5 = false;
        this.new_test_array[4][6][0] = "";
      }
      for(var c5=0;c5<2;c5++){
        this.new_test_array[4][7][c5] =0; 
        this.site2 = false;
        this.new_test_array[4][7][2] = ""; 
      }
      for(var c6=0;c6<2;c6++){
        this.new_test_array[4][8][c6] = 0;
      }

  if(event== 1){
    this.check5 = true;
    this.test5_serum = true;
    this.testcheckbox1 = true;
    if(this.hosp_private){
  this.price_array[4] = 6000;
    }else{
      this.price_array[4] = 4000;
    }
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }
    }else if(event== 0){
     this.check5 = false;
     this.test5_serum = false;
     this.price_array[4] = 0;
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount + this.price_array[i];
  }
    }

    if(this.Test_total_amount == 0){
      this.checkAmount = false;
    }else{
      this.checkAmount = true;
    }
 }
 test_new6(event: any){

  this.new_test_array[5][0] = parseInt(event);
  this.new_test_array[5][1] = parseInt(event);
  this.testcheckbox2 = true;
 
  this.Test_total_amount = 0;
  if(event== 1){
    this.check6 = true;
    this.test6_serum = true;
    this.testcheckbox1 = true;
    if(this.hosp_private){
  this.price_array[5] = 9000;
    }else{
      this.price_array[5] = 6000;
    }
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }
    }else if(event== 0){
     this.check6 = false;
     this.test6_serum = false;
     this.price_array[5] = 0;
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount + this.price_array[i];
  }
    }

    if(this.Test_total_amount == 0){
      this.checkAmount = false;
    }else{
      this.checkAmount = true;
    }
 }


 test_new7(event: any){
  this.new_test_array[6][0] = parseInt(event);
  this.new_test_array[6][1] = parseInt(event);
  this.testcheckbox2 = true;
 
  this.Test_total_amount = 0;
  if(event== 1){
    this.check7 = true;
    this.test7_serum = true;
    this.testcheckbox1 = true;
    if(this.hosp_private){
    this.price_array[6] = 3000;
    }else{
      this.price_array[6] = 2000;
    }
   for(var i = 0;i<this.price_array.length;i++){
    this.Test_total_amount = this.Test_total_amount + this.price_array[i];
   }
    }else if(event== 0){
     this.check7 = false;
     this.test7_serum = false;
     this.price_array[6] = 0;
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount + this.price_array[i];
  }
    }

    if(this.Test_total_amount == 0){
      this.checkAmount = false;
    }else{
      this.checkAmount = true;
    }
 }


 test_new8(event: any){
  this.new_test_array[7][0] = parseInt(event);
  this.new_test_array[7][1] = parseInt(event);
  this.testcheckbox2 = true;
  
  this.Test_total_amount = 0;
  if(event== 1){
    this.check8 = true;
    this.test8_serum = true;
    this.testcheckbox1 = true;
    if(this.hosp_private){
  this.price_array[7] = 3000;
    }else{
      this.price_array[7] = 2000;
    }
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }
    }else if(event== 0){
     this.check8 = false;
     this.test8_serum = false;
     this.price_array[7] = 0;
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount + this.price_array[i];
  }
    }

    if(this.Test_total_amount == 0){
      this.checkAmount = false;
    }else{
      this.checkAmount = true;
    }

 }


 test_new9(event: any){
  this.new_test_array[8][0] = parseInt(event);
  this.new_test_array[8][1] = parseInt(event);
  this.testcheckbox2 = true;
  
  this.Test_total_amount = 0;

  this.test9_col1_option1 = false;
  this.test9_col1_option2 = false;
  this.test9_col1_option3 = false;
  this.test9_col1_option4 = false;

  for(var d1=0;d1<4;d1++){
    this.new_test_array[8][3][d1] = 0;
  }

  if(event== 1){
    this.check9 = true;
    this.test9_serum = true;
    this.testcheckbox1 = true;
    if(this.hosp_private){
  this.price_array[8] = 6000;
    }else{
      this.price_array[8] = 4000;
    }
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }
    }else if(event== 0){
     this.check9 = false;
     this.test9_serum = false;
     this.price_array[8] = 0;
     for(var i = 0;i<this.price_array.length;i++){
      this.Test_total_amount = this.Test_total_amount + this.price_array[i];
     }
    }

    if(this.Test_total_amount == 0){
      this.checkAmount = false;
    }else{
      this.checkAmount = true;
    }
 }


test3_new_serum(event: any){
  this.new_test_array[2][1] = parseInt(event);
  this.testcheckbox2 = true;
 
  this.Test_total_amount = 0;
  if(event == 1){
    this.testcheckbox1 = true;
    if(this.hosp_private){
  this.price_array[2] = this.price_array[2] + 6000;
    }else{
      this.price_array[2] = this.price_array[2] + 4000;
    }
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }
}else if(event == 0){
  if(this.hosp_private){
  this.price_array[2] = this.price_array[2] - 6000;
  }else{
    this.price_array[2] = this.price_array[2] - 4000;
  }
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount + this.price_array[i];
  }
}

if(this.Test_total_amount == 0){
  this.checkAmount = false;
}else{
  this.checkAmount = true;
}

}


test4_new_serum(event: any){
  this.new_test_array[3][1] = parseInt(event);
  this.testcheckbox2 = true;
  
  this.Test_total_amount = 0;
  if(event == 1){
    this.testcheckbox1 = true;
    if(this.hosp_private){
  this.price_array[3] = this.price_array[3] + 8000;
    }else{
      this.price_array[3] = this.price_array[3] + 5300;
    }
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }
}else if(event == 0){
  if(this.hosp_private){
  this.price_array[3] =this.price_array[3] - 8000;
  }else{
    this.price_array[3] =this.price_array[3] - 5300;
  }
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount + this.price_array[i];
  }
}

if(this.Test_total_amount == 0){
  this.checkAmount = false;
}else{
  this.checkAmount = true;
}

}


//display the third checkbox option csf for test numbers 3,4, and 9
test3_new_csf(event: any){
  this.new_test_array[2][2] = parseInt(event);
  this.testcheckbox2 = true;
  
  this.Test_total_amount = 0;
  if(event == 1){
    this.testcheckbox1 = true;
    if(this.hosp_private){
  this.price_array[2] = this.price_array[2] + 6000;
    }else{
      this.price_array[2] = this.price_array[2] + 4000;
    }
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }
}else if(event == 0){
  if(this.hosp_private){
  this.price_array[2] = this.price_array[2] - 6000;
  }else{
    this.price_array[2] = this.price_array[2] - 4000;
  }
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount + this.price_array[i];
  }
}
}
test4_new_csf(event: any){
  this.new_test_array[3][2] = parseInt(event);
  this.testcheckbox2 = true;
  
  this.Test_total_amount = 0;
  if(event == 1){
    this.testcheckbox1 = true;
    if(this.hosp_private){
  this.price_array[3] = this.price_array[3] + 8000;
    }else{
      this.price_array[3] = this.price_array[3] + 5300;
    }
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }
}else if(event == 0){
  if(this.hosp_private){
  this.price_array[3] = this.price_array[3] - 8000;
  }else{
    this.price_array[3] = this.price_array[3] - 5300;
  }
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount + this.price_array[i];
  }
}
}
test9_new_csf(event: any){
  this.new_test_array[8][2] = parseInt(event);
  this.testcheckbox2 = true;
  
  this.Test_total_amount = 0;
  if(event == 1){
    this.testcheckbox1 = true;
  this.price_array[8] = this.price_array[8] + 2700;
 for(var i = 0;i<this.price_array.length;i++){
  this.Test_total_amount = this.Test_total_amount + this.price_array[i];
 }
}else if(event == 0){
  this.price_array[8] = this.price_array[8] - 2700;
  for(var i = 0;i<this.price_array.length;i++){
   this.Test_total_amount = this.Test_total_amount + this.price_array[i];
  }
}
}


back(){

  if(sessionStorage.getItem("addAuSample") == "true"){

    if( window.confirm("Are you sure you want to leave?Data entered will be lost if you leave without submitting")){
      sessionStorage.setItem("addAuSample","false");
      this.router.navigate(['/aulab']);
    }

  }else{
 
    this.router.navigate(['/aulab']);
  }
  //sessionStorage.setItem("addSample","true");
}


keyPress1(event) {

  this.dd_obj.au_trans_no = ""
  this.form.controls['au_trans_no'].disable();
  
  this.isChecked1 =  true;
  this.isChecked2 =  false;
 
 
}

keyPress2(event) {

this.dd_obj.au_dd_no = "";
this.form.controls['au_dd_no'].disable();
this.isChecked1 =  false;
this.isChecked2 =  true;


}

//test3 subgroup display
test3_col1_check1(event: any){

  this.new_test_array[2][3][0] = parseInt(event);
  
 }
 test3_col1_check2(event: any){
 
  this.new_test_array[2][3][1] = parseInt(event);
  
 }
 test3_col1_check3(event: any){
  //this.others1 = false;
  this.new_test_array[2][3][2] = parseInt(event);
  
 }
 test3_col1_check4(event: any){
  //this.others1 = false;
  this.new_test_array[2][3][3] = parseInt(event);
 
 
 }
 test3_col1_check5(event: any){
  //this.others1 = false;
  this.new_test_array[2][3][4] = parseInt(event);
  
 }
 test3_col1_check6(event: any){
 //this.others1 = false;
 this.new_test_array[2][3][5] = parseInt(event);
 
}
test3_col1_check7(event: any){
  
  this.new_test_array[2][3][6] = parseInt(event);
  this.test3_col1_option7_text = "";
  
  if(event == 1){
    this.others1 = true;
    this.new_test_array[2][3][7] = this.test3_col1_option7_text;
  }else{
    this.others1 = false;
    this.new_test_array[2][3][7] = "";
  }

 }

 test3OthersText1(text1: string): void {  
  this.new_test_array[2][3][7] = text1;
}

test3_col2_radiobutton1(){
  this.new_test_array[2][4][0] = 1;
  this.new_test_array[2][4][1] = 0;
 

}
test3_col2_radiobutton2(){
  this.new_test_array[2][4][0] = 0;
  this.new_test_array[2][4][1] = 1;
  

}
 test3_col3_check1(event: any){
  // this.others2 = false;
  // this.others3 = false;
  this.new_test_array[2][5][0] = parseInt(event);

  
}
test3_col3_check2(event: any){
  // this.others2 = false;
  // this.others3 = false;
  this.new_test_array[2][5][1] = parseInt(event);
 
}
test3_col3_check3(event: any){
  // this.others2 = false;
  // this.others3 = false;
  this.new_test_array[2][5][2] = parseInt(event);
 
}
test3_col3_check4(event: any){
  // this.others2 = false;
  // this.others3 = false;
  this.new_test_array[2][5][3] = parseInt(event);
  
}
test3_col3_check5(event: any){
  // this.others2 = false;
  // this.others3 = false;
  this.new_test_array[2][5][4] = parseInt(event);
  
}
test3_col3_check6(event: any){
  // this.others2 = false;
  // this.others3 = false;
  this.new_test_array[2][5][5] = parseInt(event);
  
}
test3_col3_check7(event: any){
   //this.others2 = true;
   //this.others3 = false;
   this.new_test_array[2][5][6] = parseInt(event);
 
   if(event == 1){
    this.others2 = true;
    this.new_test_array[2][5][7] = this.test3_col3_option7_text;
   }else{
    this.others2 = false;
    this.new_test_array[2][5][7] = "";
   }
 }
 test3OthersText2(text2: string): void {  
  this.new_test_array[2][5][7] = text2;
  
}

test3_col4_radiobutton1(){
  this.new_test_array[2][6][0] = 1;
  this.new_test_array[2][6][1] = 0;
  
}

test3_col4_radiobutton2(){
  this.new_test_array[2][6][0] = 0;
  this.new_test_array[2][6][1] = 1;
  
}

test4_col1_check1(event: any){
  //this.others4 = false;
  this.new_test_array[3][3][0] = parseInt(event);
  
 }
 test4_col1_check2(event: any){
  //this.others4 = false;
  this.new_test_array[3][3][1] = parseInt(event);
   
 }
 test4_col1_check3(event: any){
 // this.others4 = false;
 this.new_test_array[3][3][2] = parseInt(event);
  
 }
 test4_col1_check4(event: any){
  //this.others4 = false;
  this.new_test_array[3][3][3] = parseInt(event);
   
 }
 test4_col1_check5(event: any){
  //this.others4 = false;
  this.new_test_array[3][3][4] = parseInt(event);
  
 }
 test4_col1_check6(event: any){
 //this.others4 = false;
 this.new_test_array[3][3][5] = parseInt(event);
  
   if(event == 1){
    this.others4 = true;
   }else{
    this.others4 = false;
    this.new_test_array[3][3][6] = "";
   }
}

test4OthersText1(text3: string): void {  
  this.new_test_array[3][3][6] = text3;
 
}

test4_col2_radiobutton1(){
  this.new_test_array[3][4][0] = 1;
  this.new_test_array[3][4][1] = 0;
  this.site1 =  true;
 
}
test4_col2_radiobutton2(){
  this.new_test_array[3][4][0] = 0;
  this.new_test_array[3][4][1] = 1;
  this.site1 =  false;
  this.new_test_array[3][4][2] = "";
 
}
test4OthersText2(text4: string): void {  
  this.new_test_array[3][4][2] = text4;
 
}

test4_col3_radiobutton1(){

  this.new_test_array[3][5][0] = 1;
  this.new_test_array[3][5][1] = 0;

}
test4_col3_radiobutton2(){
  this.new_test_array[3][5][0] = 0;
  this.new_test_array[3][5][1] = 1;
  
  
}

test5_col1_radiobutton1(){
  this.test5_others_text = "";
  this.test5_cns_option1 = false;
  this.test5_cns_option2 = false;
  this.test5_cns_option3 = false;
  this.test5_cns_option4 = false;
  this.test5_cns_option5 = false;
  this.test5_cns_option6 = false;
  this.test5_cns_option7 = false;
  //seond radio button and checkbox array is 0
  for(var a1 = 0;a1<4;a1++){
    this.new_test_array[4][4][a1] = 0;
    
  }
 
   //third radio button and checkbox array to 0
   for(var a2 = 0;a2<3;a2++){
    this.new_test_array[4][5][a2] = 0;
    
  }

  this.others5 =  false;
  //fourth radio button and input box 0
  this.new_test_array[4][6][0] = 0;
  this.new_test_array[4][6][1] = "";
  this.test5_others_text = "";

  this.new_test_array[4][3][0] = 1;
 
  this.cns_checked = true;
  this.pns_checked = false;
  this.nmj_checked = false;
  
}

test5_col1_set1_check1(event: any){
  this.new_test_array[4][3][1] = parseInt(event);
  

}
test5_col1_set1_check2(event: any){
  this.new_test_array[4][3][2] = parseInt(event);
 

}
test5_col1_set1_check3(event: any){
  this.new_test_array[4][3][3] = parseInt(event);
  

}

test5_col1_set1_check4(event: any){
  this.new_test_array[4][3][4] = parseInt(event);
 

}

test5_col1_set1_check5(event: any){
  this.new_test_array[4][3][5] = parseInt(event);
 

}
test5_col1_set1_check6(event: any){
  this.new_test_array[4][3][6] = parseInt(event);


}

test5_col1_set1_check7(event: any){
  this.new_test_array[4][3][7] = parseInt(event);
 

}



test5_col1_radiobutton2(){
  this.test5_others_text = "";
  this.test5_pns_option1 = false;
  this.test5_pns_option2 = false;
  this.test5_pns_option3 = false;
   //first radio button and checkbox array is 0
  for(var b1 = 0;b1<8;b1++){
    this.new_test_array[4][3][b1] = 0;
    
  }
   //third radio button and checkbox array is 0
  for(var b2 = 0;b2<3;b2++){
    this.new_test_array[4][5][b2] = 0;
    
  }

   //fourth radio button and input box 0
   this.others5 = false;
   this.new_test_array[4][6][0] = 0;
   this.new_test_array[4][6][1] = "";
   this.test5_others_text = "";
    this.new_test_array[4][4][0] = 1;
    
  
  this.cns_checked = false;
  this.pns_checked = true;
  this.nmj_checked = false;
}

test5_col1_set2_check1(event: any){
  this.new_test_array[4][4][1] = parseInt(event);
 

}
test5_col1_set2_check2(event: any){
  this.new_test_array[4][4][2] = parseInt(event);
 

}
test5_col1_set2_check3(event: any){
  this.new_test_array[4][4][3] = parseInt(event);
 

}
test5_col1_radiobutton3(){
  this.test5_others_text = "";
  this.test5_nmj_option1 = false;
  this.test5_nmj_option2 = false;
  
  //first radio button and checkbox to 0
  for(var c1 = 0;c1<8;c1++){
    this.new_test_array[4][3][c1] = 0;
    
  }

  //second radio button and checkbox to 0
  for(var c2 = 0;c2<4;c2++){
    this.new_test_array[4][4][c2] = 0;
    
  }
   //fourth radio button and input box 0
   this.others5 = false;
   this.new_test_array[4][6][0] = 0;
   this.new_test_array[4][6][1] = "";
   this.test5_others_text = "";

  this.new_test_array[4][5][0] = 1;

  
  this.cns_checked = false;
  this.pns_checked = false;
  this.nmj_checked = true;
 
}


test5_col1_set3_check1(event: any){
  this.new_test_array[4][5][1] = parseInt(event);
  

}

test5_col1_set3_check2(event: any){
  this.new_test_array[4][5][2] = parseInt(event);
 

}

test5_col1_radiobutton4(){
 
   //first radio button and checkbox to 0
   for(var d1 = 0;d1<8;d1++){
    this.new_test_array[4][3][d1] = 0;
    
  }

  //second radio button and checkbox to 0
  for(var d2 = 0;d2<4;d2++){
    this.new_test_array[4][4][d2] = 0;
    
  }
   //third radio button and checkbox array is 0
   for(var d3 = 0;d3<3;d3++){
    this.new_test_array[4][5][d3] = 0;
    
  }
  
  this.new_test_array[4][6][0] = 1;
  this.others5 = true;
  this.cns_checked = false;
  this.pns_checked = false;
  this.nmj_checked = false;
  
}
test5OthersText1(text5: string){
  this.new_test_array[4][6][1] = text5;
  

}


test5_col2_radiobutton1(){
  this.site2 = true;
  this.new_test_array[4][7][0]=1;
  this.new_test_array[4][7][1]=0;
  
 

}
test5_col2_radiobutton2(){
  this.site2 = false;
  this.new_test_array[4][7][2] = "";
  this.test5_yes_text = "";
  this.new_test_array[4][7][0]=0;
  this.new_test_array[4][7][1]=1;
  
}

test5YesText1(text6: string){

  this.new_test_array[4][7][2] = text6;
  
}
test5_col3_radiobutton1(){
  this.new_test_array[4][8][0]=1;
  this.new_test_array[4][8][1]=0;
  

}
test5_col3_radiobutton2(){
  this.new_test_array[4][8][0]=0;
  this.new_test_array[4][8][1]=1;
 
}

test9_col1_checkbox1(event: any){
  this.new_test_array[8][3][0]=parseInt(event);
 
}
test9_col1_checkbox2(event: any){
  this.new_test_array[8][3][1]=parseInt(event);
  
}
test9_col1_checkbox3(event: any){
  this.new_test_array[8][3][2]=parseInt(event);
  
}
test9_col1_checkbox4(event: any){
  this.new_test_array[8][3][3]=parseInt(event);
  
}
}
