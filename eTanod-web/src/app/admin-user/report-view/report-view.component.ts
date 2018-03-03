import { Component, OnInit, Input } from '@angular/core';
import { CRIMES } from './crimes.const';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.css']
})
export class ReportViewComponent implements OnInit {
  @Input() report:any;
  obj:any;
  constructor(
  	private router:Router
  	) {
   this.obj = Object;
   }

  ngOnInit() {
  }

  openUser() {
  	$('#report-view-modal').modal('hide');
  	this.router.navigate(['admin/user/'+Object.keys(this.report.users)]);
  }

    getCrimeTypeByName(name:string):any {
  	let crime = null;
  	CRIMES.forEach((val) => {
  		if(val.name == name)
  			crime = val.src; 
  	});
  	return crime;
  }

}
