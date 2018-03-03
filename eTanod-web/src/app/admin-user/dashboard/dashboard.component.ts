import { Component, OnInit } from '@angular/core';
import { MapService, FirebaseService } from '../../shared/services';
import { CRIMES } from './crimes.const';
declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedCrime = 'All';
  crimes:Array<any>;
  reportsArray:Array<any>;
  selectedReport:any;
  constructor(
  	private mapService:MapService,
  	private firebase:FirebaseService
  	) {
  		this.crimes = CRIMES;
  		this.selectedReport = null;
  	 }

  filterCrime(name):void {
  	this.mapService.showMarkerByName(name);
  	this.selectedCrime = name;
  }

  showAllCrime():void {
  	this.mapService.showAllMarkers();
  	this.selectedCrime = 'All';
  }

  ngOnInit() {
  	let instance = this;
  	$(document).on('click','.openReport',function() {
  		instance.selectedReport = instance.reportsArray[$(this).attr('id')];
  	    $('#report-view-modal').modal('show');
  	});
  	setInterval(()=> { this.selectedReport = instance.selectedReport },100);
  	this.mapService.initMap(document.getElementById('map'));
  	this.firebase.Get('reports').on('value',(reports) => {
  		console.log(reports.val());
  		this.reportsArray= Object.keys(reports.val()).map(function(k) { return reports.val()[k] });
  		console.log(this.reportsArray);
  		this.reportsArray.forEach((report,index) => {

  			this.mapService.addMarker(report.latitude,
  				report.longitude,
  				this.getCrimeTypeByName(report.type),
  				report,
  				index
  				);	
  		});
  	});
  }

  getCrimeTypeByName(name:string):any {
  	let crime = null;
  	this.crimes.forEach((val) => {
  		if(val.name == name)
  			crime = val.src; 
  	});
  	return crime;
  }

}
