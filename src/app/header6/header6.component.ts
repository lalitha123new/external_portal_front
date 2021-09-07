import { Component, OnInit } from '@angular/core';
import {ServerService} from '../server.service';
import {AuthServiceService} from '../auth-service.service';

@Component({
  selector: 'app-header6',
  templateUrl: './header6.component.html',
  styleUrls: ['./header6.component.css']
})
export class Header6Component implements OnInit {

  constructor(private serverService: ServerService,private Auth: AuthServiceService) { }

  ngOnInit() {
  }

  logOut(){
    this.Auth.logout();
  }
  
}
