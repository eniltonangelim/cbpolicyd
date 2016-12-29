"use strict";
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
var policy_groups_service_1 = require("./policy.groups.service");
var policy_groups_1 = require("../../../model/policy.groups");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var policy_group_members_component_1 = require("../policy_group_members/policy.group.members.component");
var PolicyGroupsComponent = (function () {
    function PolicyGroupsComponent(overlay, vcRef, modalService, policyGroupsService) {
        this.modalService = modalService;
        this.policyGroupsService = policyGroupsService;
        overlay.defaultViewContainer = vcRef;
    }
    PolicyGroupsComponent.prototype.getPolicyGroups = function () {
        var _this = this;
        this.policyGroupsService
            .getPolicyGroups()
            .then(function (policyGroups) { return _this.policyGroups = policyGroups; });
    };
    PolicyGroupsComponent.prototype.openPolicyGroupMembers = function (policyGroup) {
        var builder = new bootstrap_1.BSModalContextBuilder({ policyGroup: policyGroup }, undefined, policy_group_members_component_1.CustomModalContext);
        var overlayConfig = {
            context: builder.toJSON()
        };
        return this.modalService.open(policy_group_members_component_1.PolicyGroupMembersComponent, overlayConfig);
    };
    PolicyGroupsComponent.prototype.addPolicyGroups = function () {
        var _this = this;
        if (!this.newPolicyGroups.name) {
            return null;
        }
        this.policyGroupsService.create(this.newPolicyGroups).then(function (policyGroups) {
            _this.policyGroups.push(policyGroups);
            _this.newPolicyGroups = new policy_groups_1.PolicyGroups;
        });
    };
    PolicyGroupsComponent.prototype.removePolicyGroups = function (policyGroups) {
        var _this = this;
        this.policyGroupsService.delete(Number(policyGroups.id)).then(function (delPolicy) {
            _this.policyGroups.splice(_this.policyGroups.indexOf(policyGroups), 1);
        });
    };
    PolicyGroupsComponent.prototype.montaPolicyGroups = function () {
        this.newPolicyGroups = new policy_groups_1.PolicyGroups;
        this.newPolicyGroups.id = null;
        this.newPolicyGroups.name = null;
        this.newPolicyGroups.comment = null;
        this.newPolicyGroups.disabled = null;
    };
    PolicyGroupsComponent.prototype.ngOnInit = function () {
        this.getPolicyGroups();
        this.montaPolicyGroups();
    };
    return PolicyGroupsComponent;
}());
PolicyGroupsComponent = __decorate([
    core_1.Component({
        selector: 'policyGroups-component',
        templateUrl: 'app/view/policies/policy.groups.component.html',
        providers: [bootstrap_1.Modal]
    }),
    __metadata("design:paramtypes", [angular2_modal_1.Overlay,
        core_1.ViewContainerRef,
        bootstrap_1.Modal,
        policy_groups_service_1.PolicyGroupsService])
], PolicyGroupsComponent);
exports.PolicyGroupsComponent = PolicyGroupsComponent;
//# sourceMappingURL=policy.groups.component.js.map