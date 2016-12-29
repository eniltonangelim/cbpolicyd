import { 
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA
}   from '@angular/core';

import { 
    CommonModule 
}   from '@angular/common';

import { QuotasService }   from './quotas.service';
import { QuotasLimitsComponent } from '../quotas_limits/quotas.limits.component';
import { MaterialModule }               from '@angular/material';

@NgModule({
  imports: [ MaterialModule.forRoot(), CommonModule ],
  declarations: [ ],
  providers: [ QuotasService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  entryComponents: [ QuotasLimitsComponent ]
})
export class QuotasModule {}