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
var policies_service_1 = require("../policies.service");
var policies_1 = require("../../../model/policies");
var policy_members_component_1 = require("../policy_members/policy.members.component");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var PoliciesComponent = (function () {
    function PoliciesComponent(overlay, vcRef, modalService, policiesService) {
        this.modalService = modalService;
        this.policiesService = policiesService;
        overlay.defaultViewContainer = vcRef;
    }
    PoliciesComponent.prototype.getPolicies = function () {
        var _this = this;
        this.policiesService
            .getPolicies()
            .then(function (policies) { return _this.policies = policies; });
    };
    PoliciesComponent.prototype.openPolicyMembers = function (policy) {
        var builder = new bootstrap_1.BSModalContextBuilder({ policy: policy }, undefined, policy_members_component_1.CustomModalContext);
        var overlayConfig = {
            context: builder.toJSON()
        };
        return this.modalService.open(policy_members_component_1.PolicyMembersComponent, overlayConfig);
    };
    PoliciesComponent.prototype.addPolicy = function () {
        var _this = this;
        if (!this.newPolicy.name) {
            return null;
        }
        this.policiesService.create(this.newPolicy).then(function (policy) {
            _this.policies.push(policy);
            _this.newPolicy = new policies_1.Policies;
        });
    };
    PoliciesComponent.prototype.removePolicy = function (policy) {
        var _this = this;
        this.policiesService.delete(Number(policy.id)).then(function (delPolicy) {
            _this.policies.splice(_this.policies.indexOf(policy), 1);
        });
    };
    PoliciesComponent.prototype.clearPolicy = function () {
        this.newPolicy = new policies_1.Policies;
    };
    PoliciesComponent.prototype.ngOnInit = function () {
        this.getPolicies();
        this.newPolicy = new policies_1.Policies;
    };
    return PoliciesComponent;
}());
PoliciesComponent = __decorate([
    core_1.Component({
        selector: 'policies-component',
        templateUrl: 'app/view/policies/policies.component.html',
        providers: [bootstrap_1.Modal]
    }),
    __metadata("design:paramtypes", [angular2_modal_1.Overlay,
        core_1.ViewContainerRef,
        bootstrap_1.Modal,
        policies_service_1.PoliciesService])
], PoliciesComponent);
exports.PoliciesComponent = PoliciesComponent;
//# sourceMappingURL=policies.component.js.map