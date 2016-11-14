import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MaterialModule }     from '@angular/material';

import { PoliciesMainComponent }   from './policies.main.component';

import { PoliciesRoutingModule } from './policies-routing.module';

import { PoliciesService }   from './policies.service';

@NgModule({
  imports: [
    CommonModule, MaterialModule.forRoot(),
    PoliciesRoutingModule
  ],
  declarations: [
    PoliciesMainComponent
  ],
  providers: [ PoliciesService ]
})
export class PoliciesModule {}