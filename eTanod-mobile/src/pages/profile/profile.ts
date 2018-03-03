import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth'
import { Facebook } from '@ionic-native/facebook';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  userProfile: any = null;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, public fb: Facebook) {
    afAuth.authState.subscribe(authData => {
      this.userProfile = authData;
    });

  }


  facebookLogout(){
		this.fb.logout()
		.then(function(response) {
			this.navCtrl.setRoot(LoginPage);
		}, function(error){
			console.log(error);
		});
	}


}
