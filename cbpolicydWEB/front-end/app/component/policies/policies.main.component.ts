import { Component, OnInit}  from '@angular/core';
import { ActivatedRoute, Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { PreloadSelectedModules } from '../../selective-preload-strategy';
import { PoliciesService }   from './policies.service';

@Component({
    selector: 'policies-main',
    templateUrl: 'app/view/policies/policies.main.component.html',
    //styleUrls: ['app/view/policies/policies.main.component.css'],
    providers: [PoliciesService]
})

export class PoliciesMainComponent implements OnInit {

    constructor (
        private policiesService: PoliciesService,
        private route: ActivatedRoute,
        private router: Router,
        private preloadStrategy: PreloadSelectedModules) { }

    ngOnInit(): void {

    }    

}