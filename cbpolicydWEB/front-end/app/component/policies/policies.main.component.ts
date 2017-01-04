import { Component, OnInit}         from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { Observable }               from 'rxjs/Observable';
import { Subject }                  from 'rxjs/Subject';
import { PoliciesService }          from './policy/policies.service';

@Component({
    selector: 'policies-main',
    templateUrl: 'app/view/policies/policies.main.component.html'
})

export class PoliciesMainComponent implements OnInit {

    constructor (
        private policiesService: PoliciesService) { }

    ngOnInit(): void {

    }    

}