import {Component} from '@angular/core';
import {Router}   from "@angular/router";

@Component({
  selector: 'my-app',
  templateUrl: 'app/view/home/home.html'
})
export class AppComponent{
	title = 'CBpolicyD';

  constructor (
    private router: Router) { }
}