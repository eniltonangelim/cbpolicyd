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
var policy_members_service_1 = require("./policy.members.service");
var policy_members_1 = require("../../../model/policy.members");
var CustomModalContext = (function (_super) {
    __extends(CustomModalContext, _super);
    function CustomModalContext() {
        return _super.apply(this, arguments) || this;
    }
    return CustomModalContext;
}(bootstrap_1.BSModalContext));
exports.CustomModalContext = CustomModalContext;
var PolicyMembersComponent = (function () {
    function PolicyMembersComponent(dialog, policyMembersService) {
        this.dialog = dialog;
        this.policyMembersService = policyMembersService;
        this.title = 'Policy Members';
        this.policies = dialog.context;
        dialog.setCloseGuard(this);
    }
    PolicyMembersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.policyMembersService.getPolicyMembersbyPolicyID(Number(this.policies.policy.id))
            .then(function (policyMembers) { return _this.policyMembers = policyMembers; });
        this.montaPolicyMembers();
    };
    PolicyMembersComponent.prototype.next = function (tabID) {
    };
    PolicyMembersComponent.prototype.beforeDismiss = function () {
        return true;
    };
    PolicyMembersComponent.prototype.beforeClose = function () {
        return null;
    };
    PolicyMembersComponent.prototype.close = function () {
        this.dialog.close();
    };
    PolicyMembersComponent.prototype.closeEvent = function (msg) {
        this.dialog.close();
    };
    PolicyMembersComponent.prototype.addPolicyMembers = function () {
        var _this = this;
        if (!this.newPolicyMembers.source) {
            return null;
        }
        this.policyMembersService.create(this.newPolicyMembers).then(function (policy) {
            _this.policyMembers.push(policy);
            _this.montaPolicyMembers();
        });
    };
    PolicyMembersComponent.prototype.removePolicyMembers = function (policyMembers) {
        var _this = this;
        this.policyMembersService.delete(Number(policyMembers.id)).then(function (delPolicyMembers) {
            _this.policyMembers.splice(_this.policyMembers.indexOf(policy_members_1.PolicyMembers), 1);
        });
    };
    PolicyMembersComponent.prototype.montaPolicyMembers = function () {
        this.newPolicyMembers = new policy_members_1.PolicyMembers;
        this.newPolicyMembers.id = null;
        this.newPolicyMembers.policyID = this.policies.policy.id;
        this.newPolicyMembers.source = null;
        this.newPolicyMembers.destination = null;
        this.newPolicyMembers.comment = null;
        this.newPolicyMembers.disabled = null;
    };
    return PolicyMembersComponent;
}());
PolicyMembersComponent = __decorate([
    core_1.Component({
        selector: 'modal',
        templateUrl: 'app/view/policies/policy.members.component.html',
        styleUrls: ['app/view/policies/policy.members.component.css']
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, policy_members_service_1.PolicyMembersService])
], PolicyMembersComponent);
exports.PolicyMembersComponent = PolicyMembersComponent;
//# sourceMappingURL=policies.members.component.js.map