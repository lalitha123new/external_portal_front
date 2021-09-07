import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { User } from '../user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ServerService } from '../server.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  public newSample: any = {};
  public dd_obj: any = {};
  public dd_no: Array<any> = [];
  public sampleArray: Array<any> = [];
  docList = [];
  userList: User = {} as any;
  sampleList: User = {} as any;
  form: FormGroup;
  index: any;
  selectedFile: File[] = [];
  selectedFile1: File[] = [];
  x = 0;
  sampleValue = false;
  age_max_length: number = 2;
  age_min_length: number = 1;
  checkImgSrc = 0;
  sample_image_url;
  total_amount = 0;
  total_amount1 = 0;
  total_amount3 = 0;
  value1 = 0;
  value2 = 0;
  value3 = 0;
  val1 = 0;
  val2 = 0
  val3 = 0;
  price_array = [];
  isDisabled = false;
  textBoxDisabled1 = true;
  textBoxDisabled2 = true;
  check_online = true;
  check_dd = false;
  hosp_address = "";
  hosp_type = "";
  hosp_private = true;
  age_array = [];

  unique = [];
  distinct = [];
  ext_biopsy_type = [];
  labDetails_array = [];
  ext_fixative = [];
  temp_array1 = [];
  temp_array2 = [];
  temp_val1 = "";
  ref_array = [];
  quantity1;
  quantity2;
  quantity3;
  quantity4;
 

  backend_array = [];

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
  };

  //begin code to calculate the total amount after selecting all tests
  mychange1(val1) {
    this.temp_val1 = val1;

    // if (val1 === "Blocks" || val1 === "Slides for Opinion" || val1 === "Blocks and slides") {
    //   this.value1 = 0;
    //   this.newSample.fixative = "";
    //   this.newSample.sample_type = "";
     
    // }
    if (val1 === "Surgical Biopsy") {
      this.newSample.ref_no = "";
      this.ext_biopsy_type = this.search(val1, this.labDetails_array);
      this.temp_array1 = [];
      var temp = [];
      for (var i = 0; i < this.ext_biopsy_type.length; i++) {
        temp.push(this.ext_biopsy_type[i].exlab_biopsy_type);
        this.temp_array1 = temp;
      }
       
     
      this.mychange2("Tumor (routine)");
    


    } else if (val1 === "Epilepsy surgery") {
      this.newSample.ref_no = "";
     
      this.ext_biopsy_type = this.search(val1, this.labDetails_array);
      this.temp_array1 = [];
      var temp = [];
      for (var i = 0; i < this.ext_biopsy_type.length; i++) {
        temp.push(this.ext_biopsy_type[i].exlab_biopsy_type);
        this.temp_array1 = temp;
      }
     
      this.mychange2("Epilepsy (routine) with immunohistochemistry");
      

    } else if (val1 === "Muscle biopsy") {
      this.newSample.ref_no = "";
      this.ext_biopsy_type = this.search(val1, this.labDetails_array);
      this.temp_array1 = [];
      var temp = [];
      for (var i = 0; i < this.ext_biopsy_type.length; i++) {
        temp.push(this.ext_biopsy_type[i].exlab_biopsy_type);
        this.temp_array1 = temp;
      }
     
      this.mychange2("Fresh Muscle for enzyme histochemistry (EHC)");
      

    } else if (val1 === "Nerve biopsy") {
      this.newSample.ref_no = "";
      this.ext_biopsy_type = this.search(val1, this.labDetails_array);
      this.temp_array1 = [];
      var temp = [];
      for (var i = 0; i < this.ext_biopsy_type.length; i++) {
        temp.push(this.ext_biopsy_type[i].exlab_biopsy_type);
        this.temp_array1 = temp;
      }
     
      this.mychange2("Nerve biopsy (routine)");
     

    } else if (val1 === "Skin biopsy") {
      this.newSample.ref_no = "";
      this.ext_biopsy_type = this.search(val1, this.labDetails_array);
      this.temp_array1 = [];
      var temp = [];
      for (var i = 0; i < this.ext_biopsy_type.length; i++) {
        temp.push(this.ext_biopsy_type[i].exlab_biopsy_type);
        this.temp_array1 = temp;
      }
      
      this.mychange2("Skin biopsy (routine)");
      

    } else if (val1 === "Multiple biopsies") {
      this.newSample.ref_no = "";
      this.ext_biopsy_type = this.search(val1, this.labDetails_array);
      
      this.temp_array1 = [];
      var temp = [];
      for (var i = 0; i < this.ext_biopsy_type.length; i++) {
        temp.push(this.ext_biopsy_type[i].exlab_biopsy_type);
        this.temp_array1 = temp;
      }
    
      this.mychange2("Muscle+Nerve");
      
      
      

    } else if (val1 === "Slides for Opinion") {
      this.value1 = 0;
      this.newSample.fixative = "";
      this.newSample.sample_type = "";
      this.ext_biopsy_type = this.search(val1, this.labDetails_array);
      this.temp_array1 = [];
      var temp = [];
      for (var i = 0; i < this.ext_biopsy_type.length; i++) {
        temp = this.ext_biopsy_type[i].exlab_biopsy_type.split("/");
        this.temp_array1 = temp;
      }

      this.newSample.sample_type = null;
      console.log( this.labDetails_array[14])
      if(this.hosp_private){
      this.value2 = this.labDetails_array[14].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[14].charges_govt_hosp;
      }

    } else if (val1 === "Blocks") {
      this.value1 = 0;
      this.newSample.fixative = "";
      this.newSample.sample_type = "";
      this.ext_biopsy_type = this.search(val1, this.labDetails_array);
      this.temp_array1 = [];
      var temp = [];
      for (var i = 0; i < this.ext_biopsy_type.length; i++) {
        temp = this.ext_biopsy_type[i].exlab_biopsy_type.split("/");
        this.temp_array1 = temp.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        })
        if(this.hosp_private){
        this.value2 = this.labDetails_array[15].charges_pvt_hosp;
        }else{
          this.value2 = this.labDetails_array[15].charges_govt_hosp;
        }

      }
      this.newSample.sample_type = null;


    } else if (val1 === "Blocks and slides") {
      this.value1 = 0;
      this.newSample.fixative = "";
      this.newSample.sample_type = "";
      this.newSample.fixative == undefined;
      this.ext_biopsy_type = this.search(val1, this.labDetails_array);
      this.temp_array1 = [];
      var temp = [];

      for (var i = 0; i < this.ext_biopsy_type.length; i++) {
        temp = this.ext_biopsy_type[i].exlab_biopsy_type.split("/");
        this.temp_array1 = temp;
      }
      this.newSample.sample_type = null;
      if(this.hosp_private){
      this.value2 = this.labDetails_array[17].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[17].charges_govt_hosp;
      }


    } else if (val1 === "Others") {
      this.newSample.ref_no = "";
      this.ext_biopsy_type = this.search(val1, this.labDetails_array);
      this.temp_array1 = [];
      var temp = [];
      for (var i = 0; i < this.ext_biopsy_type.length; i++) {
        temp.push(this.ext_biopsy_type[i].exlab_biopsy_type);
        this.temp_array1 = temp;
      }
      
      this.mychange2("Lip");
      

    }

  }

  mychange2(val2) {


    if (val2 === "Tumor (routine)") {
       //if user selects any other specimen and then selects sepcimen Epilepsy, then this Test is displayed
      //in the second dropdown but its not reflecting in the object
      //so added this line of code
     this.newSample.sample_type = "Tumor (routine)";
     
      
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[0].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[0].charges_govt_hosp;
      }
      this.temp_array2 = [];
      var temp_array = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;
      

    } else if (val2 === "Tumor with IHC") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[1].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[1].charges_govt_hosp; 
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Tumor+intraoperative squash/frozen") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[2].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[2].charges_govt_hosp;
      }
      this.temp_array2 = [];
      this.newSample.fixative = "";

    } else if (val2 === "Pituitary tumor with IHC") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[3].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[3].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;


    } else if (val2 === "Epilepsy (routine) with immunohistochemistry") {
      
     this.newSample.sample_type = "Epilepsy (routine) with immunohistochemistry";
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[4].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[4].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Fresh Muscle for enzyme histochemistry (EHC)") {
       
     this.newSample.sample_type = "Fresh Muscle for enzyme histochemistry (EHC)";
     this.newSample.fixative= "Saline";
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[5].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[5].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Fresh Muscle for enzyme histochemistry (EHC) + electron microscopy") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[6].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[6].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Fixed muscle (routine)") {
      this.newSample.fixative="10% Formalin";
      this.ext_fixative = this.search1(val2, this.labDetails_array);

      this.temp_array2 = [];
      var temp_array = [];
      temp_array = this.ext_fixative[0].exlab_fixative.split("/");
      this.temp_array2 = temp_array;
      if(this.hosp_private){
      this.value2 = this.labDetails_array[7].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[7].charges_govt_hosp;
      }

    } else if (val2 === "Fixed muscle (routine) with electron microscopy") {
      this.newSample.fixative="2.5% glutaraldehyde";
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[8].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[8].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Nerve biopsy (routine)") {
      this.newSample.sample_type = "Nerve biopsy (routine)";
      this.newSample.fixative= "2.5% glutaraldehyde";
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[9].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[9].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Nerve biopsy (routine) with semithin/electron microscopy") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[10].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[10].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Skin biopsy (routine)") {
      this.newSample.sample_type = "Skin biopsy (routine)";
      this.newSample.fixative= "2.5% glutaraldehyde";
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[11].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[11].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Skin biopsy (routine) with electron microscopy") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[12].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[12].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Muscle+Nerve") {
      this.newSample.sample_type = "Muscle+Nerve";
      this.newSample.fixative= "10% Formalin";
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[13].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[13].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array = this.ext_fixative[0].exlab_fixative.split("/");
      this.temp_array2 = temp_array;
      console.log(this.temp_array2);

    } else if (val2 === "Muscle+Nerve+Skin") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[22].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[22].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array = this.ext_fixative[0].exlab_fixative.split("/");
      this.temp_array2 = temp_array;

    } else if (val2 === "Muscle+Skin") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[23].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[23].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array = this.ext_fixative[0].exlab_fixative.split("/");
      this.temp_array2 = temp_array;

    } else if (val2 === "Nerve+Skin") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[24].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[24].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array = this.ext_fixative[0].exlab_fixative.split("/");
      this.temp_array2 = temp_array;

    } else if (val2 === null) {
      val2 = "Muscle/Skin/Nerve";
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if (this.temp_val1 === "Slides for Opinion") {
        if(this.hosp_private){
        this.value2 = this.labDetails_array[14].charges_pvt_hosp;
        }else{
          this.value2 = this.labDetails_array[14].charges_govt_hosp;
        }
      } else if (this.temp_val1 === "Blocks") {
        if(this.hosp_private){
        this.value2 = this.labDetails_array[15].charges_pvt_hosp;
        }else{
          this.value2 = this.labDetails_array[15].charges_govt_hosp;
        }

      } else if (this.temp_val1 === "Blocks and slides") {
        if(this.hosp_private){
        this.value2 = this.labDetails_array[17].charges_pvt_hosp;
        }else{
          this.value2 = this.labDetails_array[17].charges_govt_hosp;
        }
      }
      var temp_array = [];
      this.temp_array2 = [];
      this.ext_fixative[0].exlab_fixative = " ";
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    }else if (val2 === "Lip") {
      this.newSample.sample_type = "Lip";
      this.newSample.fixative= "10% Formalin";
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[18].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[18].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Lymph Node") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[19].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[19].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    }else if (val2 === "Fluid") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[20].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[20].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Liver") {
      this.newSample.fixative= "alcohol";
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[21].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[21].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    }
    else if (val2 === "conjunctiva") {
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
      this.value2 = this.labDetails_array[25].charges_pvt_hosp;
      }else{
        this.value2 = this.labDetails_array[25].charges_govt_hosp;
      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    } else if (val2 === "Others") {
      
      this.ext_fixative = this.search1(val2, this.labDetails_array);
      if(this.hosp_private){
       
      this.value2 = this.labDetails_array[26].charges_pvt_hosp;
      }else{
      
      this.value2 = this.labDetails_array[26].charges_govt_hosp;

      }
      var temp_array = [];
      this.temp_array2 = [];
      temp_array.push(this.ext_fixative[0].exlab_fixative);
      this.temp_array2 = temp_array;

    }


  }
  mychange3(val3) {

    if (val3 === "10% Formalin" || val3 === "2.5% Cidex" || val3 === "2% Glutaraldehyde" || val3 === "Fresh" || val3 === "Alcohol" ||
      val3 === "Other" || val3 === "None") {
      this.value3 = 0;
    }


  }
  //end code to get the price of each smaple type after selecting all tests

  onFileSelected(event) {
    for (var i = 0; i < event.target.files.length; i++)
      this.selectedFile[this.x++] = <File>event.target.files[i];
  }

  onUpload(checkImgSrc) {

    this.serverService.sendImages(this.selectedFile, checkImgSrc)
      .subscribe(res => {
        //console.log("imageResponce--"+res);
      });
    this.x = 0;
  }

  //add new sample (not add patient)
  addNewSample() {
  //console.log(this.newSample);
    
   if(this.newSample.specimen!=undefined  && this.newSample.sample_site!= undefined && this.newSample.sample_site!= "") {
    

      if((this.newSample.specimen === 'Blocks' && this.quantity1 != undefined && (this.quantity1 > 0) && this.newSample.ref_no != undefined && this.newSample.ref_no != "")
        || ((this.newSample.specimen === 'Slides for Opinion') && this.quantity2 != undefined && this.quantity2 > 0 && this.newSample.ref_no != undefined && this.newSample.ref_no != "")
        || ((this.newSample.specimen === 'Blocks and slides') && this.quantity3 != undefined && this.quantity3 > 0 && this.quantity4 != undefined && this.quantity4 > 0 && this.newSample.ref_no != undefined && this.newSample.ref_no != "" && (this.newSample.fixative === undefined || this.newSample.fixative === ""))
        || (this.newSample.specimen === 'Multiple biopsies' && this.newSample.fixative != undefined) && this.newSample.sample_quantity != undefined && (this.newSample.sample_quantity > 0) &&  this.newSample.sample_type != undefined) {

         
         if(this.newSample.fixative === undefined){
          this.newSample.fixative = null;
         }
         if(this.newSample.ref_no === undefined){
          this.newSample.ref_no = null;
         }
         
        if (this.quantity1 > 0) {
          this.newSample.sample_quantity = this.quantity1;

        } else if (this.quantity2 > 0) {
          this.newSample.sample_quantity = this.quantity2;

        } else if ((this.quantity3 > 0) && (this.quantity4 > 0)) {
          this.newSample.sample_quantity = this.quantity3;

          this.newSample.sample_quantity1 = this.quantity4;
      } 

          this.sampleArray.push(this.newSample);
          this.temp_array1 = [];
          this.temp_array2 = [];

          this.quantity1 = 0;
          this.quantity2 = 0;
          this.quantity3 = 0;
          this.quantity4 = 0;
    
    
          //if specimen is blocks or blocks and slides then the number of blocks determines the price of the sample
          if (this.temp_val1 === "Blocks") {
            if(this.hosp_private){
            this.value2 = this.labDetails_array[15].charges_pvt_hosp;
            }else{
              this.value2 = this.labDetails_array[15].charges_govt_hosp;
            }
    
            if (this.newSample.sample_quantity > 2) {
              this.value2 = 2 * this.value2;
            }
          } else if (this.temp_val1 === "Blocks and slides") {
            if(this.hosp_private){
            this.value2 = this.labDetails_array[17].charges_pvt_hosp;
            }else{
              this.value2 = this.labDetails_array[17].charges_govt_hosp;
            }
    
            if ((this.newSample.sample_quantity) > 2) {
              if(this.hosp_private){
              this.value2 = 1850;
              }else{
                this.value2 = 1250;
              }
    
            } else {
              if(this.hosp_private){
              this.value2 = this.labDetails_array[17].charges_pvt_hosp;
              }else{
                this.value2 = this.labDetails_array[17].charges_govt_hosp;
              }
            }
          }
       const testSample =  {
         specimen: '',
        sample_type:'',
        sample_site:'',
        fixative:'',
        ref_no:'',
        sample_quantity:''

       }
         let total = 0;
         var num =  0;
         //if the specimen is multiple biopsies price should be same if the user selects any tests any number of times
             num = this.sampleArray.reduce(function (n, testsample) {
              return n + (testsample.specimen == 'Multiple biopsies');
          }, 0);
       
     
         
          total = this.value1 + this.value2 + this.value3;
          
          this.price_array.push(total);
    
          this.total_amount = 0;
          if (this.total_amount > 1) {
            this.total_amount = this.total_amount;
          } else {
            this.total_amount = 0;
          }
    
          for (var i = 0; i < (this.price_array.length); i++) {
            this.total_amount = this.total_amount + this.price_array[i];
    
          }
          
          if(num > 1){
            if(this.hosp_private){
          this.total_amount = this.total_amount - (3000*(num-1));
            }else{
              this.total_amount = this.total_amount - (1500*(num-1));
            }
          }

    
          this.newSample = {};
          if (this.sampleArray.length > 0) {
            this.sampleValue = true;
          }

        
    }else if (this.newSample.fixative != undefined && this.newSample.sample_quantity != undefined && (this.newSample.sample_quantity > 0) &&  this.newSample.sample_type != undefined) {
      this.sampleArray.push(this.newSample);
      this.temp_array1 = [];
      this.temp_array2 = [];
      if (this.temp_val1 === "Blocks") {
        if(this.hosp_private){
        this.value2 = this.labDetails_array[15].charges_pvt_hosp;
        }else{
          this.value2 = this.labDetails_array[15].charges_govt_hosp;
        }
        if (this.newSample.sample_quantity > 2) {
          this.value2 = 2 * this.value2;

        }
      } else if (this.temp_val1 === "Blocks and slides") {

        if(this.hosp_private){
        this.value2 = this.labDetails_array[17].charges_pvt_hosp;
        }else{
          this.value2 = this.labDetails_array[17].charges_govt_hosp;
        }
        if ((this.newSample.sample_quantity) > 2) {
          if(this.hosp_private){
          this.value2 = 1850;
          }else{
            this.value2 = 1250;
          }

        } else {
          if(this.hosp_private){
          this.value2 = this.labDetails_array[17].charges_pvt_hosp;
          }else{
            this.value2 = this.labDetails_array[17].charges_govt_hosp;
          }
        }
      }


      let total = 0;
      var num =  0;
      //if the specimen is multiple biopsies price should be same if the user selects any tests any number of times
          num = this.sampleArray.reduce(function (n, testsample) {
           return n + (testsample.specimen == 'Multiple biopsies');
       }, 0);
    


      this.total_amount = this.value1 + this.value2 + this.value3;

      this.price_array.push(this.total_amount);

      this.total_amount = 0;
      if (this.total_amount > 1) {
        this.total_amount = this.total_amount;
      } else {
        this.total_amount = 0;
      }

      for (var i = 0; i < (this.price_array.length); i++) {
        this.total_amount = this.total_amount + this.price_array[i];

      }
if(num > 1){
  if(this.hosp_private){
  this.total_amount = this.total_amount - (3000*(num-1));
  }else{
    this.total_amount = this.total_amount - (1500*(num-1));
  }
}

      this.newSample = {};
      if (this.sampleArray.length > 0) {
        this.sampleValue = true;
      }


      }


   }
    
  }
  //end of add sample


  //begin delete added sample
  deleteNewSample(index) {

    this.sampleArray.splice(index, 1);
    if (this.sampleArray.length <= 0) {
      this.sampleValue = false;
    }

    this.price_array.splice(index, 1);
    this.total_amount = 0;

    var num =  0;
        //if there are  multiple samples with multiple  biopsies as specimen,deleting all multiple multiple
        //biopsy sample rows should subtract the price from the total amount, otherwise it should not 
        //subtract if atleast one multiple biospy row is there 
        
             num = this.sampleArray.reduce(function (n, testsample) {
              return n + (testsample.specimen == 'Multiple biopsies');
          }, 0);
        
      
    for (var i = 0; i < (this.price_array.length); i++) {
      this.total_amount = this.total_amount + this.price_array[i];
    }
   
   
    if(num > 1){
      if(this.hosp_private){
    this.total_amount = this.total_amount - (3000*(num-1));
      }else{
        this.total_amount = this.total_amount - (1500*(num-1));
      }
    }

  }
  addPatient(form: any) {
    sessionStorage.setItem("addSample","false");
    this.dd_no = [];
    this.dd_no.push(this.dd_obj);

    this.dd_obj = {};

    //if part is update sample, else part is add sample 
    if (this.index && this.index != null && this.index != undefined) {


       //splitting the object into two if the specimen is "Blocks and slides"
       for (var i = 0; i < this.sampleArray.length; i++) {
        if (this.sampleArray[i].specimen === "Blocks and slides") {
         // this.ref_array = this.sampleArray[i].ref_no.split(",");
          let obj1 = {
            "specimen": "Blocks",
            "sample_type": this.sampleArray[i].sample_type,
            "sample_site": this.sampleArray[i].sample_site,
            "ref_no": this.sampleArray[i].ref_no,
           // "ref_no": this.ref_array[0],
            "sample_quantity": this.sampleArray[i].sample_quantity
          }

          let obj2 = {
            "specimen": "Slides for Opinion",
            "sample_type": this.sampleArray[i].sample_type,
            "sample_site": this.sampleArray[i].sample_site,
            "ref_no": this.sampleArray[i].ref_no,
            //"ref_no": this.ref_array[1],
            "sample_quantity": this.sampleArray[i].sample_quantity1
          }
          //this.sampleArray.push(obj1, obj2);
          this.backend_array.push(obj1, obj2);
          
        }else{
          this.backend_array.push(this.sampleArray[i]);
        }
      }

      if(!this.form.value.pat_name){
        alert("Please fill in patient name");
        this.backend_array = [];
         this.dd_obj.dd_no = this.form.value.dd_no;
         this.dd_obj.trans_no = this.form.value.trans_no;
         this.dd_obj.bank_name = this.form.value.bank_name;
         this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
      }else if(!this.form.value.pat_age){
       alert("Please fill in patient age");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.pat_gender){
       alert("Please select gender");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.hosp_ref_no){
       alert("Please fill in Referring hospital patient id");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.referred_by){
       alert("Please fill in referred_by");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.doctor_phone_no){
       alert("Please fill in Consultant mobile number");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.doctor_email_id){
       alert("Please fill in Consultant e-mail address");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.pat_phno){
       alert("Please fill in patient mobile number");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(this.backend_array.length < 1){
       alert("Please fill specimen details row and click the tick mark");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.clinic_history){
       alert("Please fill in clinical history");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.examination){
       alert("Please fill in examination");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.investigation){
       alert("Please fill in investigation");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.diagnosis){
       alert("Please fill in diagnosis");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if((this.form.value.dd_no == "" || this.form.value.trans_no == "")){
       alert("Please select the payment mode and fill in the number");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.bank_name){
       alert("Please fill in the bank name");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }else if(!this.form.value.date_of_dd){
       alert("Please select the payment date");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;
 
     }
      else{

      this.userList = this.form.value

      if (this.form.value.pat_age_months == "") {
        this.form.value.pat_age_months = "0";
      }
      if (this.form.value.pat_age_days == "") {
        this.form.value.pat_age_days = "0";
      }

      const tempage = this.form.value.pat_age + '-' + this.form.value.pat_age_months + '-' + this.form.value.pat_age_days;
      this.userList.pat_age = tempage;

     

      this.userList["sample_test"] = JSON.stringify(this.backend_array);
      this.userList["dd_no"] = JSON.stringify(this.dd_no);
      this.userList.username = sessionStorage.getItem(name);
      this.userList.hospitalid = Number(sessionStorage.getItem("hospital_id"));
      this.userList.sample_id = Number(this.sampleList[0].sample_id);
     
      var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      if (month.length < 2) 
      month = 0 + month;
      if (day.length < 2) 
      day = 0 + day;
      var year1 = year.toString();
      var bar_date= [year1,month,day].join("");
      this.userList.extr_id =  Number(bar_date);
      

      this.serverService.updateSample(this.userList)
        .subscribe(
          (response) => {

            this.router.navigateByUrl('/dashboard/testlist')
            this.onUpload(2);
            this.toastr.success('Success', "Patient updated successfully",{
              positionClass: 'toast-bottom-center' 
           });
          }
        )
        }
    } else {
      console.log(this.sampleArray);

      for (var i = 0; i < this.sampleArray.length; i++) {
        if (this.sampleArray[i].specimen === "Blocks and slides") {
          this.ref_array = this.sampleArray[i].ref_no.split(",");
         

          let obj1 = {
            "specimen": "Blocks",
            "sample_type": this.sampleArray[i].sample_type,
            "sample_site": this.sampleArray[i].sample_site,
            "ref_no": this.sampleArray[i].ref_no,
           //"ref_no": this.ref_array[0],
            "sample_quantity": this.sampleArray[i].sample_quantity
          }

          let obj2 = {
            "specimen": "Slides for Opinion",
            "sample_type": this.sampleArray[i].sample_type,
            "sample_site": this.sampleArray[i].sample_site,
            "ref_no": this.sampleArray[i].ref_no,
           // "ref_no": this.ref_array[1],
            "sample_quantity": this.sampleArray[i].sample_quantity1
          }
          //this.sampleArray.push(obj1, obj2);
          this.backend_array.push(obj1, obj2);
        }else{ 
          this.backend_array.push(this.sampleArray[i]);
        }
      }

     // console.log(this.backend_array);
      console.log("name",this.form.value.pat_name,"age",this.form.value.pat_age,"gender",this.form.value.pat_gender,
      "ref_no",this.form.value.hosp_ref_no,"doctor",this.form.value.referred_by,"dr_phone",this.form.value.doctor_phone_no,"dr_mail",
      this.form.value.doctor_email_id,"patient phone",this.form.value.pat_phno,"clinic_hostory",this.form.value.clinic_history,
      "examination",this.form.value.examination,"investigation", this.form.value.investigation,"diagnosis", this.form.value.diagnosis,
      "dd_no",this.form.value.dd_no,"online_no",this.form.value.trans_no,"bank_name",this.form.value.bank_name,"date_of_dd",this.form.value.date_of_dd);
     
     if(!this.form.value.pat_name){
       alert("Please fill in patient name");
       this.backend_array = [];
        this.dd_obj.dd_no = this.form.value.dd_no;
        this.dd_obj.trans_no = this.form.value.trans_no;
        this.dd_obj.bank_name = this.form.value.bank_name;
        this.dd_obj.date_of_dd = this.form.value.date_of_dd;

     }else if(!this.form.value.pat_age){
      alert("Please fill in patient age");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.pat_gender){
      alert("Please select gender");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.hosp_ref_no){
      alert("Please fill in Referring hospital patient id");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.referred_by){
      alert("Please fill in referred_by");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.doctor_phone_no){
      alert("Please fill in Consultant mobile number");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.doctor_email_id){
      alert("Please fill in Consultant e-mail address");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.pat_phno){
      alert("Please fill in patient mobile number");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(this.backend_array.length < 1){
      alert("Please fill specimen details row and click the tick mark");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.clinic_history){
      alert("Please fill in clinical history");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.examination){
      alert("Please fill in examination");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.investigation){
      alert("Please fill in investigation");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.diagnosis){
      alert("Please fill in diagnosis");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if((this.form.value.dd_no== "" || this.form.value.trans_no == "")){
      alert("Please select the payment mode and fill in the number");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.bank_name){
      alert("Please fill in the bank name");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else if(!this.form.value.date_of_dd){
      alert("Please select the payment date");
      this.backend_array = [];
       this.dd_obj.dd_no = this.form.value.dd_no;
       this.dd_obj.trans_no = this.form.value.trans_no;
       this.dd_obj.bank_name = this.form.value.bank_name;
       this.dd_obj.date_of_dd = this.form.value.date_of_dd;

    }else{
      this.index = null;
      this.userList = this.form.value

      if (this.form.value.pat_age_months == "") {
        this.form.value.pat_age_months = "0";
      }
      if (this.form.value.pat_age_days == "") {
        this.form.value.pat_age_days = "0";
      }
      const tempage = this.form.value.pat_age + '-' + this.form.value.pat_age_months + '-' + this.form.value.pat_age_days;
      this.userList.pat_age = tempage;
     
   


      this.userList["sample_test"] = JSON.stringify(this.backend_array);
      this.userList["dd_no"] = JSON.stringify(this.dd_no);
      this.userList.username = sessionStorage.getItem(name);
      this.userList.hospitalid = Number(sessionStorage.getItem("hospital_id"));

      var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      if (month.length < 2) 
      month = 0 + month;
      if (day.length < 2) 
      day = 0 + day;
      var year1 = year.toString();
      var bar_date= [year1,month,day].join("");
      this.userList.extr_id =  Number(bar_date);

     
        console.log(this.userList)
      
      this.serverService.storeUser(this.userList)
        .subscribe(
          (response) => {
            this.router.navigateByUrl('/dashboard/testlist')
            this.onUpload(2);
            this.toastr.success('Success', "Patient added successfully",{
              positionClass: 'toast-bottom-center' 
           });

          },
          (error) => console.log(error)
        );
      }
    }
  }


  constructor(private serverService: ServerService, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {
    this.route.params.subscribe(params => {
      this.index = params['sample_id'];
      // check if ID exists in route & call update or add methods accordingly
      if (this.index && this.index != null && this.index != undefined) {
        this.getTestDetails(this.index);
      } else {
        this.createForm(null);
      }
    });
  }

  //get test details to show in the add/update sample page.if data is null then, add sample,else,update sample.
  //same html and ts files for add/update samples
  getTestDetails(index: number) {
    this.route.params
      .switchMap((params: Params) => this.serverService.getDetails(params['sample_id']))
      .subscribe((response) => {
        this.sampleList = response;

        this.createForm(response);
      },
        (error) => console.log(error)
      );

  }

  createForm(data) {

    if (data === null) {

      //add patient

      this.hosp_address = sessionStorage.getItem("hosp_address");
      this.form = new FormGroup({

        pat_name: new FormControl('', [Validators.required]),
        pat_age: new FormControl('', [Validators.required]),
        pat_age_months: new FormControl('', []),
        pat_age_days: new FormControl('', []),
        pat_gender: new FormControl('', [Validators.required]),
        referred_by: new FormControl('', [Validators.required]),
        doctor_phone_no: new FormControl('', [Validators.required]),
        doctor_email_id: new FormControl('', [Validators.required]),
        //amount:new FormControl({value: '', disabled: true}, []),
        amount: new FormControl('', []),
        clinic_history: new FormControl('', [Validators.required]),
        examination: new FormControl('', [Validators.required]),
        investigation: new FormControl('', [Validators.required]),
        previous_biopsy_number: new FormControl('', []),
        diagnosis: new FormControl('', [Validators.required]),
        //opetative_notes:new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]*')]),
        opetative_notes: new FormControl('', []),
        hosp_ref_no: new FormControl('', [Validators.required]),
        pat_phno: new FormControl('', [Validators.required]),
        pat_email: new FormControl('', []),
        check_dd: new FormControl(),
        dd_no: new FormControl('', [Validators.required]),
        trans_no: new FormControl('', [Validators.required]),
        bank_name: new FormControl('', [Validators.required]),
        date_of_dd: new FormControl('', [Validators.required])


      });


    }
    else {
      //edit  patient
      sessionStorage.setItem("addSample","false");
      this.hosp_address = sessionStorage.getItem("hosp_address");
      this.sampleArray = JSON.parse(data[0].sample_test);
    

      let obj = JSON.parse(data[0].dd_no);
      this.age_array = data[0].pat_age.split("-");

      this.form = new FormGroup({
        pat_name: new FormControl(data[0].pat_name, [Validators.required]),
        pat_age: new FormControl(this.age_array[0], [Validators.required]),
        pat_age_months: new FormControl(this.age_array[1], []),
        pat_age_days: new FormControl(this.age_array[2], []),
        pat_gender: new FormControl(data[0].pat_gender, [Validators.required]),
        referred_by: new FormControl(data[0].referred_by, [Validators.required]),
        doctor_phone_no: new FormControl(data[0].doctor_phone_no, [Validators.required]),
        doctor_email_id: new FormControl(data[0].doctor_email_id, [Validators.required]),
        amount: new FormControl(data[0].amount, []),
        clinic_history: new FormControl(data[0].clinic_history, [Validators.required]),
        examination: new FormControl(data[0].examination, [Validators.required]),
        investigation: new FormControl(data[0].investigation, [Validators.required]),
        previous_biopsy_number: new FormControl(data[0].previous_biopsy_number, []),
        status: new FormControl(data[0].status, []),
        diagnosis: new FormControl(data[0].diagnosis, [Validators.required]),
        opetative_notes: new FormControl(data[0].opetative_notes, []),
        hosp_ref_no: new FormControl(data[0].hosp_ref_no, [Validators.required]),
        pat_phno: new FormControl(data[0].pat_phno, [Validators.required]),
        pat_email: new FormControl(data[0].pat_email, []),
        check_dd: new FormControl(),
        dd_no: new FormControl(obj[0].dd_no, [Validators.required]),
        trans_no: new FormControl(obj[0].trans_no, [Validators.required]),
        bank_name: new FormControl(obj[0].bank_name, [Validators.required]),
        date_of_dd: new FormControl(obj[0].date_of_dd, [Validators.required])


      });

      this.dd_obj.dd_no = obj[0].dd_no;
      this.dd_obj.trans_no = obj[0].trans_no;
      this.dd_obj.bank_name = obj[0].bank_name;
      this.dd_obj.date_of_dd = obj[0].date_of_dd;

    


      let exists = true;
      //in the update sample, for calculateing the total amount, the same price array is used to store each test price
      //so that if the user deletes any previously added sample, change is reflected automatically
      for (var i = 0; i < this.sampleArray.length; i++) {

        this.value2 =0;
        if(this.hosp_private){

        if (this.sampleArray[i].sample_type === "Tumor (routine)" || this.sampleArray[i].sample_type === "Fixed muscle (routine)" || this.sampleArray[i].sample_type === "Nerve biopsy (routine)" || this.sampleArray[i].sample_type === "Skin biopsy (routine)" || this.sampleArray[i].sample_type === "Lip" ||
          this.sampleArray[i].sample_type === "Liver" || this.sampleArray[i].sample_type === "Lymph Node" || this.sampleArray[i].sample_type === "conjunctiva" || this.sampleArray[i].sample_type === "Others"
          || this.sampleArray[i].sample_type === "Fluid") {
          this.value2 = 1500;
        } else if (this.sampleArray[i].sample_type === "Tumor+intraoperative squash/frozen" || this.sampleArray[i].sample_type === "Fresh Muscle for enzyme histochemistry (EHC)") {
          this.value2 = 2000;
        } else if (this.sampleArray[i].sample_type === "Fixed muscle (routine) with electron microscopy" || this.sampleArray[i].sample_type === "Nerve biopsy (routine) with semithin/electron microscopy" ||
          this.sampleArray[i].sample_type === "Skin biopsy (routine) with electron microscopy") {
          this.value2 = 3000;
        } else if (this.sampleArray[i].sample_type === "Fresh Muscle for enzyme histochemistry (EHC) + electron microscopy") {
          this.value2 = 3500;
        } else if (this.sampleArray[i].sample_type === "Epilepsy (routine) with immunohistochemistry") {
          this.value2 = 4000;
        } else if (this.sampleArray[i].sample_type === "Tumor with IHC" || this.sampleArray[i].sample_type === "Pituitary tumor with IHC") {
          this.value2 = 5500;
        } else if (this.sampleArray[i].specimen === "Slides for Opinion") {
          this.value2 = 350;
        } else if ((this.sampleArray[i].specimen === "Blocks")) {
          if(this.sampleArray[i].sample_quantity <= 2){
          this.value2 = 750;
          }else{
            this.value2 = 1500;
          }
        } else if (this.sampleArray[i].sample_type === "Blocks for opinion (<2) and slides") {
          this.value2 = 1100;
        } else if (this.sampleArray[i].sample_type === "Blocks for opinion (>2) and slides") {
          this.value2 = 1850;
        }else if(this.sampleArray[i].specimen === "Multiple biopsies"){
         //if(exists == true) {
          this.value2 =3000
        // }
        // exists = false;  
        
        }
      }else{
if (this.sampleArray[i].sample_type === "Tumor (routine)" || this.sampleArray[i].sample_type === "Fixed muscle (routine)" || this.sampleArray[i].sample_type === "Nerve biopsy (routine)" || this.sampleArray[i].sample_type === "Skin biopsy (routine)" || this.sampleArray[i].sample_type === "Lip" ||
          this.sampleArray[i].sample_type === "Liver" || this.sampleArray[i].sample_type === "Lymph Node" || this.sampleArray[i].sample_type === "conjunctiva" || this.sampleArray[i].sample_type === "Others"
          || this.sampleArray[i].sample_type === "Fluid") {
          this.value2 = 1000;
        } else if (this.sampleArray[i].sample_type === "Tumor+intraoperative squash/frozen") {
          this.value2 = 1000;
        } else if( this.sampleArray[i].sample_type === "Fresh Muscle for enzyme histochemistry (EHC)"){
          this.value2 = 1500;
        }else if (this.sampleArray[i].sample_type === "Fixed muscle (routine) with electron microscopy" || this.sampleArray[i].sample_type === "Nerve biopsy (routine) with semithin/electron microscopy" ||
          this.sampleArray[i].sample_type === "Skin biopsy (routine) with electron microscopy") {
          this.value2 = 2000;
        } else if (this.sampleArray[i].sample_type === "Fresh Muscle for enzyme histochemistry (EHC) + electron microscopy") {
          this.value2 = 2500;
        } else if (this.sampleArray[i].sample_type === "Epilepsy (routine) with immunohistochemistry") {
          this.value2 = 2500;
        } else if (this.sampleArray[i].sample_type === "Tumor with IHC" || this.sampleArray[i].sample_type === "Pituitary tumor with IHC") {
          this.value2 = 3500;
        } else if (this.sampleArray[i].specimen === "Slides for Opinion") {
          this.value2 = 250;
        } else if ((this.sampleArray[i].specimen === "Blocks")) {
          if(this.sampleArray[i].sample_quantity <= 2){
          this.value2 = 500;
          }else{
            this.value2 = 1000;
          }
        } else if (this.sampleArray[i].sample_type === "Blocks for opinion (<2) and slides") {
          this.value2 = 1100;
        } else if (this.sampleArray[i].sample_type === "Blocks for opinion (>2) and slides") {
          this.value2 = 1850;
        }else if(this.sampleArray[i].specimen === "Multiple biopsies"){
         //if(exists == true) {
          this.value2 =1500;
         //}
         //exists = false;  
        
        }

      }
        
        this.price_array.push(this.value2);
        

      }
      

      var num =  0;
      // if the specimen is multiple biopsies, and there are multiple such rows, the price is constant regardless of the number and type of tests
      
          num = this.sampleArray.reduce(function (n, testsample) {
           return n + (testsample.specimen == 'Multiple biopsies');
       }, 0);

      for (var i = 0; i < (this.price_array.length); i++) {
        this.total_amount = this.total_amount + this.price_array[i];
      }

      if(num > 1){
        if(this.hosp_private){
        this.total_amount = this.total_amount - (3000*(num-1));
        }else{
          this.total_amount = this.total_amount - (1500*(num-1));
        }
        }

    
      
      if (data[0].sample_image_url != null) {
        this.sample_image_url = this.serverService.baseUrl + data[0].sample_image_url;


      } else {
        this.sample_image_url = "";
      }


      if (this.sampleArray.length > 0) {
        this.sampleValue = true;
      }
    }

  }

  ngOnInit() {

    //to display confirm box based on the pages
    sessionStorage.setItem("addSample","true");
    this.dd_obj.trans_no = ""
    this.dd_obj.dd_no = '';
    this.dd_obj.bank_name = '';
   this.hosp_type = sessionStorage.getItem("hosp_type"); 
   //this.hosp_type = "private";
   if(this.hosp_type == "private"){
     this.hosp_private = true;
   }else{
    this.hosp_private = false;
   }
    this.getLabDetails();

  }


  getDoctor() {
    this.serverService.getAllDoctors()
      .subscribe(
        (docList) => {
          this.docList = docList
        },
        (error) => console.log(error)
      );
  }

  toggle1() {

    this.check_online = true;
    this.check_dd = false;
    this.dd_obj.trans_no = ""

    this.form.controls['trans_no'].disable();
    this.form.controls['dd_no'].enable();
    this.form.controls['bank_name'].enable();

  }
  toggle2() {

    this.check_online = false;
    this.check_dd = true;
    // this.dd_obj.bank_name="";
    this.dd_obj.dd_no = "";
    this.form.controls['trans_no'].enable();
    this.form.controls['dd_no'].disable();
    //this.form.controls['bank_name'].disable();
    this.form.controls['bank_name'].enable();

  }

  keyPress1(event) {

    this.dd_obj.trans_no = ""
    this.form.controls['trans_no'].disable();
   
   
}

keyPress2(event) {

  this.dd_obj.dd_no = "";
  this.form.controls['dd_no'].disable();
 
 
}

  //to get the sample details, price etc from the db
  getLabDetails() {

    this.serverService.getAllLabDetails()
      .subscribe(
        (response) => {
         
          this.labDetails_array = response;

          for (let i = 0; i < this.labDetails_array.length; i++) {
            if (!this.unique[this.labDetails_array[i].exlab_specimen]) {
              this.distinct.push(this.labDetails_array[i].exlab_specimen);
              this.unique[this.labDetails_array[i].exlab_specimen] = 1;
            }

          }

        },
        (error) => console.log(error)
      );

  }


  search(nameKey, labarray) {

    for (var i = 0; i < labarray.length; i++) {
      var filteredArray = labarray.filter(function (name) {
        return name.exlab_specimen == nameKey;
      });
      return filteredArray;

    }

  }

  search1(nameKey, labarray) {

    for (var i = 0; i < labarray.length; i++) {
      var filteredArray = labarray.filter(function (name) {
        return name.exlab_biopsy_type == nameKey;
      });
      return filteredArray;

    }

  }

}
