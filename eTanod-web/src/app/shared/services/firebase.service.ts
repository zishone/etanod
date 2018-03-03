import { Injectable } from '@angular/core';
import { FIREBASE_CONFIG } from '../../../config/firebase-config.const';
declare const firebase:any;
@Injectable()
export class FirebaseService {
	private database:any;
	
	constructor(){
		firebase.initializeApp(FIREBASE_CONFIG); 
		this.database = firebase.database();
	}

	Get(path):any {
		return this.database.ref(path);
	}

	Add(path,data):void {
		this.database.ref(path).set(data);
	}

	Update(path,data):void {
		this.database.ref(path + '/' + data._id).set(data);
	}

	Delete(path,data):any {
		this.database.ref(path + '/' + data._id).remove();
		return data;
	}

}