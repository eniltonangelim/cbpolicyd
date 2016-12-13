import { Component, OnInit}  from '@angular/core';
import { ActivatedRoute, Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { PoliciesService }   from './policies.service';

@Component({
    selector: 'policies-main',
    templateUrl: 'app/view/policies/policies.main.component.html'
    //styleUrls: ['app/view/policies/policies.main.component.css'],
})

export class PoliciesMainComponent implements OnInit {

    constructor (
        private policiesService: PoliciesService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit(): void {

    }    

}