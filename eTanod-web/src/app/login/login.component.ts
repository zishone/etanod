import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../shared/services';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  wrong:boolean;
  constructor(
  	private service:FirebaseService,
  	private router:Router
  	) { 
  	this.wrong = false;
  }

  ngOnInit() {
  	
  	this.service.Get('reports').on('value',(snapshot:any) => {
  		console.log(snapshot.val());
  	});
  	$('#login-form').parsley();
  }

  login():void {
  	if($('#login-form').parsley().validate()) {
  		if($('[name="username"]').val() == "zish123" && $('[name="password"]').val() == "12345"){
  			$('#modal-id').modal('hide');
  			this.router.navigate(['admin']);
  		}
  		else this.wrong = true;
  	}
  }

}
