import { Component, OnInit } from '@angular/core';
import {ServerService} from '../server.service';
import {AuthServiceService} from '../auth-service.service';

@Component({
  selector: 'app-header3',
  templateUrl: './header3.component.html',
  styleUrls: ['./header3.component.css']
})
export class Header3Component implements OnInit {
  fileUrl1 = this.serverService.baseUrl;
  fileUrl2 = "";

  constructor(private serverService: ServerService,private Auth: AuthServiceService) { }

  ngOnInit() {
  }


  userDoc(doc_type){
    if(doc_type == 1){
    this.fileUrl1 = "assets/NeuroPathDoc.pdf";
    
    }else if(doc_type == 2){
      this.fileUrl1 = "assets/AULabDoc.pdf";
   
    }else{
      this.fileUrl1 = "assets/Histopath_Clinicans handbook_Final.pdf";
    }
    this.fileUrl2 = this.fileUrl1 ;
    window.open(this.fileUrl2, '_blank');
  }

  priceDoc(doc_type){
    if(doc_type == 1){
    this.fileUrl1 = "assets/NeuropathPrice.pdf";
    
    }else{
      this.fileUrl1 = "assets/AULabPrice.pdf";
   
    }
    this.fileUrl2 = this.fileUrl1 ;
    window.open(this.fileUrl2, '_blank');
  }

  
    logOut(){
      this.Auth.logout();
    }
  

}
