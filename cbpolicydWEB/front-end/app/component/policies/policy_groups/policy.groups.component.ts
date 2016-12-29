import { Component, OnInit, ViewContainerRef, ViewEncapsulation}      from '@angular/core';
import { ActivatedRoute, Router }            from '@angular/router';
import { Observable }            from 'rxjs/Observable';
import { Subject }               from 'rxjs/Subject';
import { PolicyGroupsService }   from './policy.groups.service';
import { PolicyGroups }          from '../../../model/policy.groups';
import { Overlay, overlayConfigFactory, OverlayConfig } from 'angular2-modal';
import { Modal, BSModalContext, BSModalContextBuilder } from 'angular2-modal/plugins/bootstrap';
import { PolicyGroupMembersComponent, CustomModalContext }  from '../policy_group_members/policy.group.members.component';
@Component({
    selector: 'policyGroups-component',
    templateUrl: 'app/view/policies/policy.groups.component.html',
    providers: [ Modal ]
})

export class PolicyGroupsComponent implements OnInit {

    private policyGroups: PolicyGroups[];
    private policyGroup: PolicyGroups;
    private newPolicyGroups: PolicyGroups;

    constructor (
            overlay: Overlay, 
            vcRef: ViewContainerRef,
            public modalService: Modal,
            private policyGroupsService: PolicyGroupsService
    ) {
            overlay.defaultViewContainer = vcRef;
    }

    getPolicyGroups(): void {
        this.policyGroupsService
            .getPolicyGroups()
            .then(policyGroups => this.policyGroups = policyGroups);
    }

    openPolicyGroupMembers(policyGroup: PolicyGroups){
        const builder = new BSModalContextBuilder<CustomModalContext>(
            {policyGroup: policyGroup} as any,
            undefined,
            CustomModalContext
        );

        let overlayConfig: OverlayConfig = {
            context: builder.toJSON()
        };        

        return this.modalService.open(PolicyGroupMembersComponent, overlayConfig );
    }

    addPolicyGroups(): void {
        if (!this.newPolicyGroups.name) { return null}
        this.policyGroupsService.create(this.newPolicyGroups).then(
            policyGroups => {
                this.policyGroups.push(policyGroups);
                this.newPolicyGroups = new PolicyGroups;
            }
        )
    }

    removePolicyGroups(policyGroups: PolicyGroups): void {
        this.policyGroupsService.delete(Number(policyGroups.id)).then(
            delPolicy => {
                this.policyGroups.splice(this.policyGroups.indexOf(policyGroups), 1);
            }
        )        
    }   

    montaPolicyGroups(): void {
        this.newPolicyGroups  = new PolicyGroups;
        this.newPolicyGroups.id = null;
        this.newPolicyGroups.name = null;
        this.newPolicyGroups.comment = null;
        this.newPolicyGroups.disabled = null;

    }

    ngOnInit(): void {
        this.getPolicyGroups();
        this.montaPolicyGroups();
    }    

}