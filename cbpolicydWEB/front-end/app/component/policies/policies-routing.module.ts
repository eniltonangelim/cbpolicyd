import { NgModule }     from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PoliciesMainComponent }       from './policies.main.component';


const policiesRoutes: Routes = [
    {path: 'main', component: PoliciesMainComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(policiesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PoliciesRoutingModule {}