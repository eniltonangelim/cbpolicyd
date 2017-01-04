import { Component, OnInit}         from '@angular/core';
import { ActivatedRoute, Router }   from '@angular/router';
import { Observable }               from 'rxjs/Observable';
import { Subject }                  from 'rxjs/Subject';
import { AccessControlService }     from './access.control.service';
import { AccessControl }            from '../../../model/access.control';
import { PoliciesService }   from '../policy/policies.service';
import { Policies }          from '../../../model/policies';

@Component({
    selector: 'accessControl-component',
    templateUrl: 'app/view/access_control/access.control.component.html'
})

export class AccessControlComponent implements OnInit {

    private accessControls: AccessControl[];
    private accessControl: AccessControl;
    private newAccessControls: AccessControl;
    private policies: Policies[];
    private verdicts = ['HOLD', 'REJECT', 'DISCARD',  'FILTER',  'REDIRECT',  'OK' ];

    constructor (private policiesService: PoliciesService, private accessControlService: AccessControlService) { 
            
    }

    getAccessControl(): void {
        this.accessControlService
            .getAccessControls()
            .then(accessControl => this.accessControls = accessControl);
    }

    getPolicy(): void {
        this.policiesService
            .getPolicies()
            .then(policies => this.policies = policies)
    }

    montaAccessControl(): void{
        this.newAccessControls = new AccessControl;
        this.newAccessControls.id = null;
        this.newAccessControls.policyID = null;
        this.newAccessControls.name = null;
        this.newAccessControls.verdict = null;
        this.newAccessControls.data = null;
        this.newAccessControls.comment = null;
        this.newAccessControls.disabled = 0;
    }

    addAccessControls(): void {
        if (!this.newAccessControls.name && !this.newAccessControls.policyID) {return null}
        this.accessControlService.create(this.newAccessControls)
            .then(
                acl => {
                    this.accessControls.push(acl);
                    this.montaAccessControl();
                }
            )
    }

    deleteAccessControl(accessControl: AccessControl ): void {
        this.accessControlService.delete(Number(accessControl.id)).then(
            delAcl => {
                this.accessControls.splice(this.accessControls.indexOf(accessControl), 1);
            }
        )
    }

    ngOnInit(): void {
        this.getAccessControl();
        this.montaAccessControl();
        this.getPolicy();
    }    

    clearAccessControl():void {
        this.montaAccessControl();
    }

}