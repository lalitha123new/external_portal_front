import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import {User} from '../user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import {ServerService} from '../server.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FilterPipe} from '../filter.pipe';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { stringify } from 'querystring';
import { IMyDpOptions } from 'mydatepicker';
import { disableDebugTools } from '@angular/platform-browser';




@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  p: number = 1;

  userList: User[]=[];
  i=0;
  interval: any;
  testListData: any;
  buttonstatus:boolean;
  username;
  searchTerm:string
  Gender:string
  sortedList:User[]=[];
  date_check = "0";
  
  

  constructor(private serverService: ServerService, private router:Router) { }

  ngOnInit() {
    this.getTestList();
    this.interval = setInterval(() => { 
      this.getTestList(); 
  }, 30000);
  }

  

  //to get the sample status - whether it is received at the Receiving station or not
  checkstatus(temp)
  {
    if(!(temp.status == "Pending" || temp.status == "Pending receipt"))
    {
     return true;
    }
    return false;
  }

  // to get the sample list for the logged in hospital and display in latest sample first order
  getTestList()
  {
    this.username=sessionStorage.getItem(name);
    this.serverService.getAllpatients(this.username)
    .subscribe(
      (userList) =>{

        this.userList=userList;
        
       
        for(var i=0;i<this.userList.length;i++){
          if(this.userList[i].date_of_entry != null){
          var d = new Date(this.userList[i].date_of_entry);
          var d1 =  d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
          d.getHours() + ":" + d.getMinutes();
          this.userList[i].date_of_entry = d1;;
          }else{
            this.userList[i].date_of_entry = "NA";
          }
        }
        this.userList =  this.userList.reverse();
        
        
        },
    (error) =>console.log(error)
    );
  }

  FilterGenderF()
  {
    this.serverService.filterData('gender','Female')
    .subscribe((userList)=>{
      this.userList=userList;
    },
    (error)=>console.log(error)
    );
  }

  FilterGenderM()
  {
    this.serverService.filterData('gender','Male')
    .subscribe((userList)=>{
      this.userList=userList;
    },
    (error)=>console.log(error)
    );
  }

   SortS(value:string){ 
    
    this.serverService.getSortedPatients(value)
    .subscribe((response)=>{
       this.userList=response;
        },
    (error)=>console.log(error)
    );
  }

  
  FilterSpecimen(value:string){
    this.serverService.filterData('specimen',value)
    .subscribe((userList)=>{
      this.userList=userList;
    },
    (error)=>console.log(error)
    );
  } 
  
  sendTheMessage(sample_id,npno){
    
  sessionStorage.setItem("sampleid",sample_id);
  sessionStorage.setItem("npnum",npno);
  this.router.navigate(["/dashboard/send-message"]);

  }

  //reset the page if the user has applied filter
  Reset(){
    window.location.reload();
  }

  getTestListSort()
  {
  
    this.username=sessionStorage.getItem(name);
    this.serverService.getAllpatients(this.username)
    .subscribe(
      (userList) =>{

        this.userList=userList;
        
       
        for(var i=0;i<this.userList.length;i++){
          if(this.userList[i].date_of_entry != null){
          var d = new Date(this.userList[i].date_of_entry);
          var d1 =  d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
          d.getHours() + ":" + d.getMinutes();
          this.userList[i].date_of_entry = d1;;
          }else{
            this.userList[i].date_of_entry = "NA";
          }
        }
        if(this.date_check == "0"){
         
        this.userList =  this.userList;
        this.date_check = "1";
        }else{
         
          this.userList =  this.userList.reverse();
          this.date_check = "0";
        }
        
        
        },
    (error) =>console.log(error)
    );
  }
 
}
