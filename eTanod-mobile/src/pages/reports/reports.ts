import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, ToastController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { ReportDetailPage } from '../reportDetail/reportDetail';
import { ReportCrimePage } from '../reportCrime/reportCrime';

declare const google: any;

@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html'
})
export class ReportsPage {


  @ViewChild('map') mapElement: ElementRef;
  reportArray:Array<any>;

  map: any;
  latLng = new google.maps.LatLng(14.5535, 121.0499);

  reports: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public modalCtrl: ModalController, private toastCtrl: ToastController) {
    this.reports = db.list('/reports');
    this.reports.subscribe(data => {
      this.reportArray =  data;
      for(let i = 0; i < data.length; i++){
        this.addMarker(new google.maps.LatLng(data[i].latitude, data[i].longitude));
      }
      let toast = this.toastCtrl.create({
        message: 'Something near you is happening',
        duration: 3000,
        position: 'top'
      });

      toast.present();
    });
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  loadMap(){
    let mapOptions = {
      center: this.latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      draggable: false,
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

    let icon = {
      url: "assets/pins/currentPosition.png", // url
      scaledSize: new google.maps.Size(10, 10), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 0) // anchor
    };

    let marker = new google.maps.Marker({
      map: this.map,
      position: this.latLng,
      icon: icon
    });
  }

  addMarker(position: any){
    new google.maps.Marker({
        'position': position,
        'icon': {
          url: "assets/pins/redDot.png", // url
          scaledSize: new google.maps.Size(10, 10), // scaled size
          origin: new google.maps.Point(0,0), // origin
          anchor: new google.maps.Point(0, 0) // anchor
        },
        'visible': true,
        map: this.map
    }, this.onMarkerAdded);
  }

  onMarkerAdded(marker) { console.log(marker); }

  tab = 1;

  setTab(newTab){
    this.tab = newTab;
  }

  isSet(tabNum){
    return this.tab === tabNum;
  }

  openModal() {
    let myModal = this.modalCtrl.create(ReportCrimePage);
    myModal.present();
  }

  goToDetail() {
    this.navCtrl.push(ReportDetailPage);
  }



}
