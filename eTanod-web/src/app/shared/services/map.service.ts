import { Injectable } from '@angular/core';
declare var $;
declare const google:any;
declare const moment:any;
@Injectable()
export class MapService {
	private map:any;
	private markerArray:Array<any>;
	private bounds:any;
	constructor() {
		this.markerArray = [];
		this.bounds =  new google.maps.LatLngBounds();
	}

	initMap(map):void {
		this.map = new google.maps.Map(map, {
			zoom:4,
			center:{lat: -34.397, lng: 150.644}
		});
	}

	createIcon(icon):any {
		return  {
   		 url: icon, // url
    	 scaledSize: new google.maps.Size(30, 30), // scaled size
 	     origin: new google.maps.Point(0,0), // origin
  	     anchor: new google.maps.Point(0, 0) // anchor
		};
	}

	addMarker(lat,lng,icon, data,pos):void {

		let marker = new google.maps.Marker({
			position:{lat:parseInt(lat),lng:parseInt(lng)},
			icon:this.createIcon(icon),	
			map:this.map
		});
		let user = data.users[Object.keys(data.users)[0]];
		this.markerArray.push({"type":data.type,"marker":marker});
		
		this.bounds.extend(marker.position);
		
	
		this.map.fitBounds(this.bounds);
		  let infoWindow = new google.maps.InfoWindow({
                content: '<b>Originally Reported by:</b>&nbsp;' + user.name
                         +'<br><b>Date:</b>&nbsp;' + moment(user.timestamp.replace(' ','T')).format('MMMM DD, YYYY') +
                         '<br><b>Time:</b>&nbsp;' +   moment(user.timestamp.replace(' ','T')).format('HH:mm A') + 
                         '<br><div id="' + pos  + '" class="openReport btn btn-primary btn-small">View Details</div>'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.open(this.map, marker);
            });

		let zoomChangeBoundsListener = 
    	google.maps.event.addListenerOnce(this.map, 'bounds_changed', function(event) {
        if (this.getZoom()){
            this.setZoom(4);
        }
		});
	setTimeout(function(){google.maps.event.removeListener(zoomChangeBoundsListener)}, 2000);
	}

	clearMarkers():void {
		this.markerArray = [];
	}

	hideAllMarkers():void {
		this.markerArray.forEach((marker,index) => {
			this.markerArray[index].marker.setVisible(false);
		});
	}

	showAllMarkers():void {
		this.markerArray.forEach((marker,index) => {
			this.markerArray[index].marker.setVisible(true);
		});
	}

	showMarkerByName(name):void {
		this.hideAllMarkers();
		this.markerArray.forEach((marker,index) => {
				console.log(marker.name + '-' + name);
			if(marker.type == name) {
				this.markerArray[index].marker.setVisible(true);
			}
		});
	}
}