import { Component, OnInit, Input}   from '@angular/core';
import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';
import { PolicyGroupMembersService }    from './policy.group.members.service';
import { PolicyGroupMembers }         from '../../../model/policy.group.members';
import { PolicyGroups }         from '../../../model/policy.groups';

export class CustomModalContext extends BSModalContext {
  public policyGroup: PolicyGroups;
}

@Component({
  selector: 'modal',
  templateUrl: 'app/view/policies/policy.group.members.component.html',
  styleUrls: ['app/view/policies/policy.group.members.component.css']
})

export class PolicyGroupMembersComponent implements OnInit, CloseGuard, ModalComponent<CustomModalContext> {

   policies: CustomModalContext;
   private title = 'Policy Groups:';
   private policyGroupMembers:  PolicyGroupMembers[];
   private newPolicyGroupMembers: PolicyGroupMembers;

   constructor(public dialog: DialogRef<CustomModalContext>, private policyGroupMembersService: PolicyGroupMembersService) {
         
          this.policies = dialog.context;
          dialog.setCloseGuard(this); 

   }
  
   ngOnInit(): void {       
          
          this.policyGroupMembersService.getPolicyGroupMembersbyPolicyGroupID(Number(this.policies.policyGroup.id))
            .then(policyGroupMembers => this.policyGroupMembers = policyGroupMembers );
          
          console.log(this.policies.policyGroup.name)
          this.montaPolicyGroupMembers();

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

   addPolicyGroupMembers(): void {
        if (!this.newPolicyGroupMembers.member) { return null}
        this.policyGroupMembersService.create(this.newPolicyGroupMembers).then(
            policyGroup => {
                this.policyGroupMembers.push(policyGroup);
                this.montaPolicyGroupMembers();
            }
        )
   }

   removePolicyGroupMembers(policyGroupMembers: PolicyGroupMembers): void {
        this.policyGroupMembersService.delete(Number(policyGroupMembers.id)).then(
            delPolicyGroupMembers => {
                this.policyGroupMembers.splice(this.policyGroupMembers.indexOf(PolicyGroupMembers), 1);
            }
        )        
   }

   montaPolicyGroupMembers(): void {
        this.newPolicyGroupMembers = new PolicyGroupMembers;
        this.newPolicyGroupMembers.id = null;
        this.newPolicyGroupMembers.policyGroupID = this.policies.policyGroup.id;
        this.newPolicyGroupMembers.member = null;
        this.newPolicyGroupMembers.comment = null;
   }

}