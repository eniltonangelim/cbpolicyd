import { 
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
}       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PoliciesMainComponent }   from './policies.main.component';
import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesService }   from './policies.service';

@NgModule({
  imports: [
    CommonModule,
    PoliciesRoutingModule
  ],
  declarations: [
    PoliciesMainComponent
  ],
  providers: [ PoliciesService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PoliciesModule {}