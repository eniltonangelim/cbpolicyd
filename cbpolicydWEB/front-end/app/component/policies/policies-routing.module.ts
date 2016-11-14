import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { PoliciesMainComponent }       from './policies.main.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'main', component: PoliciesMainComponent },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class PoliciesRoutingModule {}