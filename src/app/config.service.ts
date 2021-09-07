import { Injectable } from '@angular/core';
import {trigger, state, animate, style, transition} from '@angular/core';


@Injectable()
export class ConfigService {
  apiURL:string;
	constructor() {
		this.apiURL = "http://localhost/api/";
	}

 

}
export function routerTransition() {
	return slideToLeft();
}

export function slideToLeft() {
	return trigger('routerTransition', [
		transition(':enter', [
			style({transform: 'translateX(100%)', position:'fixed', width:'100%'}),
			animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
			]),
		transition(':leave', [
			style({transform: 'translateX(0%)', position:'fixed', width:'100%'}),
			animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
			])
		]);
}

