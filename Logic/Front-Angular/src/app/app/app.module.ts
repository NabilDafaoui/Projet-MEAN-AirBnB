import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AffichageBienComponent } from '../affichage-bien/affichage-bien.component';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SDKGoogleMapModule } from 'sdk-google-map';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AffichageBienComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SDKGoogleMapModule,
    NgbToastModule    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
