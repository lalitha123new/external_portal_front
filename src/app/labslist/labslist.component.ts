import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {ServerService} from '../server.service';
import { routerTransition } from '../config.service';
import {AuthServiceService} from '../auth-service.service';
@Component({
  selector: 'app-labslist',
  templateUrl: './labslist.component.html',
  styleUrls: ['./labslist.component.css']
})
export class LabslistComponent implements OnInit {

  constructor(private router: Router,private serverService: ServerService) { }
  fileUrl1 = this.serverService.baseUrl;
  fileUrl2 = "";

  ngOnInit() {
  }

  //to go to respective lab based on selection
  naviageteLab(v){
    if(v==1){
    this.router.navigate(['dashboard/testlist']);
  }else if(v==2){
    this.router.navigate(['aulab']);
  }

}


//to open doc upon clicking respective button
userDoc(doc_type){
  if(doc_type == 1){
  this.fileUrl1 = "assets/NeuroPathDoc.pdf";
  
  }else if(doc_type == 2){
    this.fileUrl1 = "assets/AULabDoc.pdf";
 
  }else if(doc_type == 3){
    this.fileUrl1 = "assets/Histopath_Clinicans handbook_Final.pdf";
  }else{
    this.fileUrl1 = "assets/Autoimmune Lab Brochure.pdf";
  }
  this.fileUrl2 = this.fileUrl1 ;
  window.open(this.fileUrl2, '_blank');
}

// to open price list doc for the respective lab
priceDoc(doc_type){
  if(doc_type == 1){
  this.fileUrl1 = "assets/NeuropathPrice.pdf";
  
  }else{
    this.fileUrl1 = "assets/AULabPrice.pdf";
 
  }
  this.fileUrl2 = this.fileUrl1 ;
  window.open(this.fileUrl2, '_blank');
}
}
