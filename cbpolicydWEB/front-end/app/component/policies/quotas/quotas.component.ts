import { Component, OnInit, ViewContainerRef}  from '@angular/core';
import { ActivatedRoute, Router }            from '@angular/router';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import { QuotasService }     from './quotas.service';
import { PoliciesService }   from '../policy/policies.service';
import { Quotas }            from '../../../model/quotas';
import { QuotasLimits }            from '../../../model/quotas.limits';
import { Policies }          from '../../../model/policies';
import { Overlay, overlayConfigFactory, OverlayConfig } from 'angular2-modal';
import { Modal, BSModalContext, BSModalContextBuilder } from 'angular2-modal/plugins/bootstrap';
import { QuotasLimitsComponent, CustomModalContext }  from '../quotas_limits/quotas.limits.component';

@Component({
    selector: 'quotas-component',
    templateUrl: 'app/view/quotas/quotas.component.html',
    providers: [ Modal ]
})

export class QuotasComponent implements OnInit {

    private quotas: Quotas[];
    private newQuota: Quotas;
    private policies: Policies;
    private verdicts = ['HOLD', 'REJECT', 'DISCARD',  'FILTER',  'REDIRECT',  'OK' ];

    constructor (overlay: Overlay, vcRef: ViewContainerRef, public modalService: Modal,private policiesService: PoliciesService, private quotasService: QuotasService) 
    {
        overlay.defaultViewContainer = vcRef;
    }

    getQuotas(): void {
        this.quotasService
            .getQuotas()
            .then(quotas => this.quotas = quotas);
    }

    getPolicy(): void {
        this.policiesService
            .getPolicies()
            .then(policies => this.policies = policies)
    }

    montaQuota(): void{
        this.newQuota = new Quotas;
        this.newQuota.id = null;
        this.newQuota.policyID = null;
        this.newQuota.name = null;
        this.newQuota.track = null;
        this.newQuota.period = null;
        this.newQuota.verdict = null;
        this.newQuota.data = null;
        this.newQuota.lastQuota = null;
        this.newQuota.comment = null;
        this.newQuota.disabled = null;
    }

    addQuotas(): void {
        if (!this.newQuota.policyID) { return null}
        this.quotasService.create(this.newQuota).then(
            quota => {
                this.quotas.push(quota);
                this.montaQuota();
            }
        )
    }

    deleteQuota(quota: Quotas): void {
        this.quotasService.delete(Number(quota.id)).then(
            delQuota => {
                this.quotas.splice(this.quotas.indexOf(quota), 1);
            }
        )        
    }

    ngOnInit(): void {
        this.getQuotas();
        this.getPolicy();
        this.montaQuota();
    }    

    clearQuotas(): void {
        this.montaQuota();
    }

    openQuotasLimits(quotas: Quotas){
        const builder = new BSModalContextBuilder<CustomModalContext>(
            {quota: quotas} as any,
            undefined,
            CustomModalContext
        );

        let overlayConfig: OverlayConfig = {
            context: builder.toJSON()
        };        

        return this.modalService.open(QuotasLimitsComponent, overlayConfig );
    }

}