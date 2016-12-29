import { 
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA
}   from '@angular/core';

import { 
    CommonModule 
}   from '@angular/common';

import { 
    AccessControlService 
}   from './access.control.service';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ],
  providers: [ AccessControlService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AccessControlModule {}