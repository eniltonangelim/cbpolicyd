import { Component, OnInit, Input}   from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { QuotasLimitsService }    from './quotas.limits.service';
import { QuotasLimits }         from '../../../model/quotas.limits';
import { Quotas }         from '../../../model/quotas';

export class CustomModalContext extends BSModalContext {
  public quota: Quotas;
}

@Component({
  selector: 'modal',
  templateUrl: 'app/view/quotas/quotas.limits.component.html',
  styleUrls: ['app/view/quotas/quotas.limits.component.css']
})

export class QuotasLimitsComponent implements OnInit, CloseGuard, ModalComponent<CustomModalContext> {

   quotas: CustomModalContext;
   private title = 'Quotas:';
   private quotasLimits:  QuotasLimits[];
   private newQuotasLimits: QuotasLimits;

   constructor(public dialog: DialogRef<CustomModalContext>, private quotasLimitsService: QuotasLimitsService) {
         
          this.quotas = dialog.context;
          dialog.setCloseGuard(this); 

   }
  
   ngOnInit(): void {       
          
          this.quotasLimitsService.getQuotasLimitsbyQuotasID(Number(this.quotas.quota.id))
            .then(quotasLimits => this.quotasLimits = quotasLimits );
          
          this.montaQuotasLimits();

   }

   next(tabID: number): void {

   }

   beforeDismiss(): boolean {
      return true;
   }

   beforeClose(): boolean {
      return null;
   }

   close(): void {
      this.dialog.close();
   }

   closeEvent(msg: String): void{
      this.dialog.close();
   }

   addQuotasLimits(): void {
        if (!this.newQuotasLimits.quotasID) { return null}
        this.quotasLimitsService.create(this.newQuotasLimits).then(
            quota => {
                this.quotasLimits.push(quota);
                this.montaQuotasLimits();
            }
        )
   }

   removeQuotasLimits(quotasLimits: QuotasLimits): void {
        this.quotasLimitsService.delete(Number(quotasLimits.id)).then(
            delQuotasLimits => {
                this.quotasLimits.splice(this.quotasLimits.indexOf(QuotasLimits), 1);
            }
        )        
   }

   montaQuotasLimits(): void {
        this.newQuotasLimits = new QuotasLimits;
        this.newQuotasLimits.id = null;
        this.newQuotasLimits.quotasID = this.quotas.quota.id;
        this.newQuotasLimits.counterLimit = null;
        this.newQuotasLimits.comment = null;
        this.newQuotasLimits.disabled = 0;
   }

}