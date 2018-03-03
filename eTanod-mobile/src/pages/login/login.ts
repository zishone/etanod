import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';

import { Facebook } from '@ionic-native/facebook';
import { AngularFireAuth } from 'angularfire2/auth'
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userProfile: any = null;

  constructor(public navCtrl: NavController, private facebook: Facebook, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(authData => {
      if(authData){
        navCtrl.setRoot(TabsPage, {userProfile: this.userProfile});
      }
    });
  }

  facebookLogin(){
    this.facebook.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

        this.afAuth.auth.signInWithCredential(facebookCredential)
        .then((success) => {
            // console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;

            this.navCtrl.setRoot(TabsPage, {userProfile: this.userProfile});
        })
        .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
        });

    }).catch((error) => { console.log(error) });
  }

}
