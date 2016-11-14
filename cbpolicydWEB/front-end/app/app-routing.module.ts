import { ModuleWithProviders, NgModule }   from '@angular/core';
import { RouterModule } from '@angular/router';

//import { CanDeactivateGuard }              from './service/login/guard/can-deactivate-guard.service';
//import { AuthGuard }                       from './service/login/auth-guard.service'
import { PreloadSelectedModules }          from './selective-preload-strategy';

//import { SigninComponent }                 from './component/login/signin.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      //{ path: 'signin',  component: SigninComponent }
    ],
    { preloadingStrategy: PreloadSelectedModules })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    //CanDeactivateGuard,
    PreloadSelectedModules
  ]
})
export class AppRoutingModule {}
