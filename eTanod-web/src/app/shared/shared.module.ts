import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService, MapService } from './services';
@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
  	FirebaseService,
  	MapService
  ]
})

export class SharedModule {

}