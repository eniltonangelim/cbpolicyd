import { NgModule }      	            from '@angular/core';
import { BrowserModule }	            from '@angular/platform-browser';
import { FormsModule }   	            from '@angular/forms';
import { HttpModule }    	            from '@angular/http';

/*Component*/
import { AppComponent } 	            from './app.component';
import { AppRoutingModule }           from './app-routing.module';

import { PoliciesModule }            from './component/policies/policies.module';

/*Service*/
/*Material designer*/
import {MaterialModule}     from '@angular/material';

@NgModule({
  imports:      [ 
  	BrowserModule, FormsModule,
  	HttpModule, AppRoutingModule,
    MaterialModule.forRoot(), PoliciesModule
  ],
  declarations: [ 
    AppComponent, 
    ],
  providers: [  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }