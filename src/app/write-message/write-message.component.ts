import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-write-message',
  templateUrl: './write-message.component.html',
  styleUrls: ['./write-message.component.css']
})
export class WriteMessageComponent implements OnInit {

  userList: User[]=[];
  username;
 

  constructor(private serverService: ServerService) { }

  ngOnInit() {
    this.getTestList();
  }

  //get all samples list
  getTestList()
  {
    this.username=sessionStorage.getItem(name);
    this.serverService.getAllpatients(this.username)
    .subscribe(
      (userList) =>{
        this.userList=userList;
        console.log(userList);
        },
    (error) =>console.log(error)
    );
  }


  //send the message for a sample_id
  // sendTheMessage(){

  //   this.username=sessionStorage.getItem(name);
  //   this.serverService.submitTheMessage()
  //   .subscribe(
  //     (userList) =>{
  //       this.userList=userList;
  //       console.log(userList);
  //       },
  //   (error) =>console.log(error)
  //   );

  // }
}
