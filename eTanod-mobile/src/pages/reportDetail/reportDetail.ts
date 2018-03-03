import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-reportDetail',
  templateUrl: 'reportDetail.html'
})
export class ReportDetailPage {

  constructor(public navCtrl: NavController) {

  }

  tab = 1;

  setTab(newTab){
    this.tab = newTab;
  }

  isSet(tabNum){
    return this.tab === tabNum;
  }

}
