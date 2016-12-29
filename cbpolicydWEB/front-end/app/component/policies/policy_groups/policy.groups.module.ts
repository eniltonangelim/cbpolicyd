import { 
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
}       from '@angular/core';
import { CommonModule }   from '@angular/common';

import { PolicyGroupsService }            from './policy.groups.service';
import { PolicyGroupMembersComponent  }               from '../policy_group_members/policy.group.members.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ],
  providers: [ PolicyGroupsService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [ PolicyGroupMembersComponent ]
})
export class PolicyGroupsModule {}