"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var policy_group_members_service_1 = require("./policy.group.members.service");
var policy_group_members_1 = require("../../../model/policy.group.members");
var CustomModalContext = (function (_super) {
    __extends(CustomModalContext, _super);
    function CustomModalContext() {
        return _super.apply(this, arguments) || this;
    }
    return CustomModalContext;
}(bootstrap_1.BSModalContext));
exports.CustomModalContext = CustomModalContext;
var PolicyGroupMembersComponent = (function () {
    function PolicyGroupMembersComponent(dialog, policyGroupMembersService) {
        this.dialog = dialog;
        this.policyGroupMembersService = policyGroupMembersService;
        this.title = 'Policy Groups:';
        this.policies = dialog.context;
        dialog.setCloseGuard(this);
    }
    PolicyGroupMembersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.policyGroupMembersService.getPolicyGroupMembersbyPolicyGroupID(Number(this.policies.policyGroup.id))
            .then(function (policyGroupMembers) { return _this.policyGroupMembers = policyGroupMembers; });
        console.log(this.policies.policyGroup.name);
        this.montaPolicyGroupMembers();
    };
    PolicyGroupMembersComponent.prototype.next = function (tabID) {
    };
    PolicyGroupMembersComponent.prototype.beforeDismiss = function () {
        return true;
    };
    PolicyGroupMembersComponent.prototype.beforeClose = function () {
        return null;
    };
    PolicyGroupMembersComponent.prototype.close = function () {
        this.dialog.close();
    };
    PolicyGroupMembersComponent.prototype.closeEvent = function (msg) {
        this.dialog.close();
    };
    PolicyGroupMembersComponent.prototype.addPolicyGroupMembers = function () {
        var _this = this;
        if (!this.newPolicyGroupMembers.member) {
            return null;
        }
        this.policyGroupMembersService.create(this.newPolicyGroupMembers).then(function (policyGroup) {
            _this.policyGroupMembers.push(policyGroup);
            _this.montaPolicyGroupMembers();
        });
    };
    PolicyGroupMembersComponent.prototype.removePolicyGroupMembers = function (policyGroupMembers) {
        var _this = this;
        this.policyGroupMembersService.delete(Number(policyGroupMembers.id)).then(function (delPolicyGroupMembers) {
            _this.policyGroupMembers.splice(_this.policyGroupMembers.indexOf(policy_group_members_1.PolicyGroupMembers), 1);
        });
    };
    PolicyGroupMembersComponent.prototype.montaPolicyGroupMembers = function () {
        this.newPolicyGroupMembers = new policy_group_members_1.PolicyGroupMembers;
        this.newPolicyGroupMembers.id = null;
        this.newPolicyGroupMembers.policyGroupID = this.policies.policyGroup.id;
        this.newPolicyGroupMembers.member = null;
        this.newPolicyGroupMembers.comment = null;
    };
    return PolicyGroupMembersComponent;
}());
PolicyGroupMembersComponent = __decorate([
    core_1.Component({
        selector: 'modal',
        templateUrl: 'app/view/policies/policy.group.members.component.html',
        styleUrls: ['app/view/policies/policy.group.members.component.css']
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, policy_group_members_service_1.PolicyGroupMembersService])
], PolicyGroupMembersComponent);
exports.PolicyGroupMembersComponent = PolicyGroupMembersComponent;
//# sourceMappingURL=policy.group.members.component.js.map