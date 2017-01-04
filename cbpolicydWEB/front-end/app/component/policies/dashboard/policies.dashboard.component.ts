import { Component, OnInit}  from '@angular/core';
import { ActivatedRoute, Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { PoliciesService }   from '../policy/policies.service';

@Component({
    selector: 'policies-dashboard',
    templateUrl: 'app/view/policies/policies.dashboard.component.html'
    //styleUrls: ['app/view/policies/policies.dashboard.component.css'],
})

export class PoliciesDashboardComponent implements OnInit {

    constructor (
    private policiesService: PoliciesService) { }

    ngOnInit(): void {}    

}