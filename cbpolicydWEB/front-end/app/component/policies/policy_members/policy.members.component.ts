import { Component, OnInit, Input}   from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { PolicyMembersService }    from './policy.members.service';
import { PolicyMembers }         from '../../../model/policy.members';
import { Policies }         from '../../../model/policies';

export class CustomModalContext extends BSModalContext {
  public policy: Policies;
}

@Component({
  selector: 'modal',
  templateUrl: 'app/view/policies/policy.members.component.html',
  styleUrls: ['app/view/policies/policy.members.component.css']
})

export class PolicyMembersComponent implements OnInit, CloseGuard, ModalComponent<CustomModalContext> {

   policies: CustomModalContext;
   private title = 'Policy Members:';
   private policyMembers:  PolicyMembers[];
   private newPolicyMembers: PolicyMembers;

   constructor(public dialog: DialogRef<CustomModalContext>, private policyMembersService: PolicyMembersService) {
          this.policies = dialog.context;
          dialog.setCloseGuard(this); 

   }
  
   ngOnInit(): void {       
          
          this.policyMembersService.getPolicyMembersbyPolicyID(Number(this.policies.policy.id))
            .then(policyMembers => this.policyMembers = policyMembers );
          
          this.montaPolicyMembers();

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

   addPolicyMembers(): void {
        if (!this.newPolicyMembers.source) { return null}
        this.policyMembersService.create(this.newPolicyMembers).then(
            policy => {
                this.policyMembers.push(policy);
                this.montaPolicyMembers();
            }
        )
   }

   removePolicyMembers(policyMembers: PolicyMembers): void {
        this.policyMembersService.delete(Number(policyMembers.id)).then(
            delPolicyMembers => {
                this.policyMembers.splice(this.policyMembers.indexOf(PolicyMembers), 1);
            }
        )        
   }

   montaPolicyMembers(): void {
        this.newPolicyMembers = new PolicyMembers;
        this.newPolicyMembers.id = null;
        this.newPolicyMembers.policyID = this.policies.policy.id
        this.newPolicyMembers.source = null;
        this.newPolicyMembers.destination = null;
        this.newPolicyMembers.comment = null;
        this.newPolicyMembers.disabled = null;
   }

}