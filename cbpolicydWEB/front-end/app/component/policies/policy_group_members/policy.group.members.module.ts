import { 
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
}       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MaterialModule }               from '@angular/material';
import { PolicyGroupMembersService }    from './policy.group.members.service';
import { PolicyGroupMembersComponent }  from './policy.group.members.component';

@NgModule({
  imports: [
     MaterialModule.forRoot(), CommonModule
  ],
  declarations: [ PolicyGroupMembersComponent ],
  providers: [ PolicyGroupMembersService  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PolicyGroupMembersModule {}