import { 
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
}       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { MaterialModule }               from '@angular/material';
import { QuotasLimitsService }    from './quotas.limits.service';
import { QuotasLimitsComponent }  from './quotas.limits.component';

@NgModule({
  imports: [
     MaterialModule.forRoot(), CommonModule
  ],
  declarations: [ QuotasLimitsComponent ],
  providers: [ QuotasLimitsService  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class QuotasLimitsModule {}