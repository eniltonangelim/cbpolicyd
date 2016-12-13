import { 
  NgModule, 
  CUSTOM_ELEMENTS_SCHEMA 
  }                     	            from '@angular/core';
import { BrowserModule }	            from '@angular/platform-browser';
import { FormsModule }   	            from '@angular/forms';
import { HttpModule }    	            from '@angular/http';

/*Component*/
import { PoliciesModule }             from './component/policies/policies.module';
import { AppComponent } 	            from './app.component';
import { AppRoutingModule }           from './app-routing.module';

import {MaterialModule}     from '@angular/material';

@NgModule({
  imports:      [ 
  	PoliciesModule, BrowserModule, 
    FormsModule, HttpModule, 
    AppRoutingModule, MaterialModule.forRoot() 
  ],
  declarations: [ 
    AppComponent, 
    ],
  providers: [  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }