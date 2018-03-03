import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

declare const google: any;

@Component({
  selector: 'page-reportCrime',
  templateUrl: 'reportCrime.html'
})
export class ReportCrimePage {

  report = {
    type: "",
    description: "",
    latitude: "",
    longitude: "",
    valid: true,
    users: {},
    chats: {
        message1: {
            user: "Bot",
            type: "text",
            content: "Hello, World!",
            timestamp: "today"
        }
    }
  };

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  latLng = new google.maps.LatLng(14.5535, 121.0499);

  reports: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, private afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.afAuth.authState.subscribe(authData => {
      this.report.users[authData.uid] = {
        name: authData.displayName,
        email: authData.email,
        contact: "09177948846",
        timestamp: "now"
      };
    });

    this.reports = db.list('/reports');
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let mapOptions = {
      center: this.latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }
      ]
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.report.latitude = "14.5535";
    this.report.longitude = "121.0499";

    let marker = new google.maps.Marker({
      map: this.map,
      position: this.latLng,
      draggable:true
    });
    google.maps.event.addListener(marker, 'dragend', function()
    {
      this.report.latitude = marker.getPosition().lat();
      this.report.longitude = marker.getPosition().lng();
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }


  submit(){
    this.reports.push(this.report);
    this.closeModal();
  }


}
