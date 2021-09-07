import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute} from '@angular/router';
import{ ServerService} from '../server.service';
import { routerTransition } from '../config.service';
import {User} from '../user';
import {  Params } from '@angular/router'; 
import 'rxjs/add/operator/switchMap'; 



@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  //animations: [routerTransition()],
 	//host: {'[@routerTransition]': ''}
})
export class DescriptionComponent implements OnInit {
  index:any;
  sample:User[]=[];
  constructor(private route: ActivatedRoute,  private serverService:ServerService,private toastr: ToastrService) { 
   
  }

  ngOnInit() {
    this.route.params
    .switchMap((params: Params) => this.serverService.getDetails(params['sample_id']))
    .subscribe((response)=>{this.sample=response;
      },
    (error) =>console.log(error)
    );
 
      }
}