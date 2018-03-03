import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../shared/services';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  reports:any;
  user:any;
  obj:any;
  constructor(
  	private firebaseService:FirebaseService,
  	private activatedRoute:ActivatedRoute
  	) {
  		this.reports = [];
  		this.user = [];
  		this.obj = Object;	
  	 }

  ngOnInit() {
  	this.activatedRoute.params.subscribe(params => {
  		this.firebaseService.Get('reports').on('value',(report) => {
  			Object.keys(report.val()).forEach((val) => {
  				Object.keys(report.val()[val].users).forEach((val1) => {
  					if(val1 == params['userid']) {
  						this.reports.push(report.val()[val]);
  						this.user = report.val()[val].users[val1];
  					}
  				});
  			});
  		});
  	})
  }

}
