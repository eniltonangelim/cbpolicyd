import { 
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
}       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MaterialModule }               from '@angular/material';
import { PolicyMembersService }  from './policy.members.service';
import { PolicyMembersComponent } from './policy.members.component';

@NgModule({
  imports: [
    MaterialModule.forRoot(), CommonModule  
  ],
  declarations: [ PolicyMembersComponent ],
  providers: [ PolicyMembersService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PolicyMembersModule {}