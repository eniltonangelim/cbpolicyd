import { 
  NgModule, 
  CUSTOM_ELEMENTS_SCHEMA 
  }                     	              from '@angular/core';
import { BrowserModule }	              from '@angular/platform-browser';
import { FormsModule }   	              from '@angular/forms';
import { HttpModule }    	              from '@angular/http';
import { InMemoryWebApiModule }         from 'angular-in-memory-web-api';
import { ModalModule }                  from 'angular2-modal';
import { BootstrapModalModule }         from 'angular2-modal/plugins/bootstrap';

/*Component*/
import { PoliciesDashboardComponent }   from './component/policies/dashboard/policies.dashboard.component';
import { PoliciesMainComponent }        from './component/policies/policies.main.component';

import { PoliciesComponent }            from './component/policies/policy/policies.component';
import { PolicyGroupsComponent }        from './component/policies/policy_groups/policy.groups.component';
import { QuotasComponent }              from './component/policies/quotas/quotas.component';
import { AccessControlComponent }       from './component/policies/access_control/access.control.component';

import { PoliciesModule }               from './component/policies/policy/policies.module';
import { QuotasModule }                 from './component/policies/quotas/quotas.module';
import { QuotasLimitsModule }                 from './component/policies/quotas_limits/quotas.limits.module';
import { AccessControlModule }          from './component/policies/access_control/access.control.module';
import { PolicyGroupsModule }           from './component/policies/policy_groups/policy.groups.module';
import { PolicyGroupMembersModule }     from './component/policies/policy_group_members/policy.group.members.module';
import { PolicyMembersModule }          from './component/policies/policy_members/policy.members.module';

import { InMemoryDataPoliciesService }  from './inMemory/in-memory-data.policies.service';

import { AppComponent } 	              from './app.component';
import { AppRoutingModule }             from './app-routing.module';
import { MaterialModule }               from '@angular/material';

@NgModule({
  imports:      [ 
  	MaterialModule.forRoot(), PolicyMembersModule, PoliciesModule, QuotasModule,
    AccessControlModule, PolicyGroupMembersModule, PolicyGroupsModule,
    BrowserModule, ModalModule.forRoot(), QuotasLimitsModule,
    FormsModule, HttpModule, 
    InMemoryWebApiModule.forRoot(InMemoryDataPoliciesService),
    AppRoutingModule, 
    BootstrapModalModule 
  ],
  declarations: [ 
    AppComponent, PoliciesDashboardComponent,
    PoliciesMainComponent, PoliciesComponent,
    QuotasComponent, AccessControlComponent,
    PolicyGroupsComponent
    ],
  providers: [  ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }