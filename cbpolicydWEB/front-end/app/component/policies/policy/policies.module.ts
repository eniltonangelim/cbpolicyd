import { 
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
}       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MaterialModule }               from '@angular/material';

import { PolicyMembersComponent }  from '../policy_members/policy.members.component';
import { PoliciesService }            from '../policies.service';

@NgModule({
  imports: [
    CommonModule, MaterialModule.forRoot()
  ],
  declarations: [ ],
  providers: [ PoliciesService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [ PolicyMembersComponent ]
})
export class PoliciesModule {}