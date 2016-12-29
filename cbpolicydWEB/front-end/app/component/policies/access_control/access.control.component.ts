import { Component, OnInit}         from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { Observable }               from 'rxjs/Observable';
import { Subject }                  from 'rxjs/Subject';
import { AccessControlService }     from './access.control.service';
import { AccessControl }            from '../../../model/access.control';

@Component({
    selector: 'accessControl-component',
    templateUrl: 'app/view/access_control/access.control.component.html'
})

export class AccessControlComponent implements OnInit {

    private accessControls: AccessControl[];

    constructor (
        private accessControlService: AccessControlService) { }

    getAccessControl(): void {
        this.accessControlService
            .getAccessControls()
            .then(accessControl => this.accessControls = accessControl);
    }


    ngOnInit(): void {
        this.getAccessControl();
    }    

}