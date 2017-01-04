import { Component, OnInit, ViewContainerRef, ViewEncapsulation}  from '@angular/core';
import { ActivatedRoute, Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { PoliciesService }   from './policies.service';
import { Policies }          from '../../../model/policies';
import { PolicyMembersComponent, CustomModalContext }   from '../policy_members/policy.members.component';
import { Overlay, overlayConfigFactory, OverlayConfig } from 'angular2-modal';
import { Modal, BSModalContext, BSModalContextBuilder } from 'angular2-modal/plugins/bootstrap';

@Component({
    selector: 'policies-component',
    templateUrl: 'app/view/policies/policies.component.html',
    providers: [ Modal ]
})

export class PoliciesComponent implements OnInit {

    private policies: Policies[];
    private policy: Policies;
    private newPolicy: Policies;

    constructor (
            overlay: Overlay, 
            vcRef: ViewContainerRef,
            public modalService: Modal,
            private policiesService: PoliciesService
    ) {
            overlay.defaultViewContainer = vcRef;
    }

    getPolicies(): void {
        this.policiesService
            .getPolicies()
            .then(policies => this.policies = policies);
    }


    openPolicyMembers(policy: Policies){
        const builder = new BSModalContextBuilder<CustomModalContext>(
            {policy: policy} as any,
            undefined,
            CustomModalContext
        );

        let overlayConfig: OverlayConfig = {
            context: builder.toJSON()
        };        

        return this.modalService.open(PolicyMembersComponent, overlayConfig );
    }

    addPolicy(): void {
        if (!this.newPolicy.name) { return null }
        this.policiesService.create(this.newPolicy).then(
            policy => {
                this.policies.push(policy);
                this.montaPolicy();
            }
        )
    }

    removePolicy(policy: Policies): void {
        this.policiesService.delete(Number(policy.id)).then(
            delPolicy => {
                this.policies.splice(this.policies.indexOf(policy), 1);
            }
        )        
    }


    montaPolicy(): void {
        this.newPolicy = new Policies
        this.newPolicy.name = null
        this.newPolicy.priority = null
        this.newPolicy.description = null
        this.newPolicy.disabled = 0
    }


    clearPolicy(): void {
        this.montaPolicy()
    }

    ngOnInit(): void {
        this.getPolicies();
        this.montaPolicy();
    }    

}