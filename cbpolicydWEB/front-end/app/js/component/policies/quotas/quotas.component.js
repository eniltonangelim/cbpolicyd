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
var quotas_service_1 = require("./quotas.service");
var policies_service_1 = require("../policy/policies.service");
var quotas_1 = require("../../../model/quotas");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var quotas_limits_component_1 = require("../quotas_limits/quotas.limits.component");
var QuotasComponent = (function () {
    function QuotasComponent(overlay, vcRef, modalService, policiesService, quotasService) {
        this.modalService = modalService;
        this.policiesService = policiesService;
        this.quotasService = quotasService;
        this.verdicts = ['HOLD', 'REJECT', 'DISCARD', 'FILTER', 'REDIRECT', 'OK'];
        overlay.defaultViewContainer = vcRef;
    }
    QuotasComponent.prototype.getQuotas = function () {
        var _this = this;
        this.quotasService
            .getQuotas()
            .then(function (quotas) { return _this.quotas = quotas; });
    };
    QuotasComponent.prototype.getPolicy = function () {
        var _this = this;
        this.policiesService
            .getPolicies()
            .then(function (policies) { return _this.policies = policies; });
    };
    QuotasComponent.prototype.montaQuota = function () {
        this.newQuota = new quotas_1.Quotas;
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
    };
    QuotasComponent.prototype.addQuotas = function () {
        var _this = this;
        if (!this.newQuota.policyID) {
            return null;
        }
        this.quotasService.create(this.newQuota).then(function (quota) {
            _this.quotas.push(quota);
            _this.montaQuota();
        });
    };
    QuotasComponent.prototype.deleteQuota = function (quota) {
        var _this = this;
        this.quotasService.delete(Number(quota.id)).then(function (delQuota) {
            _this.quotas.splice(_this.quotas.indexOf(quota), 1);
        });
    };
    QuotasComponent.prototype.ngOnInit = function () {
        this.getQuotas();
        this.getPolicy();
        this.montaQuota();
    };
    QuotasComponent.prototype.clearQuotas = function () {
        this.montaQuota();
    };
    QuotasComponent.prototype.openQuotasLimits = function (quotas) {
        var builder = new bootstrap_1.BSModalContextBuilder({ quota: quotas }, undefined, quotas_limits_component_1.CustomModalContext);
        var overlayConfig = {
            context: builder.toJSON()
        };
        return this.modalService.open(quotas_limits_component_1.QuotasLimitsComponent, overlayConfig);
    };
    return QuotasComponent;
}());
QuotasComponent = __decorate([
    core_1.Component({
        selector: 'quotas-component',
        templateUrl: 'app/view/quotas/quotas.component.html',
        providers: [bootstrap_1.Modal]
    }),
    __metadata("design:paramtypes", [angular2_modal_1.Overlay, core_1.ViewContainerRef, bootstrap_1.Modal, policies_service_1.PoliciesService, quotas_service_1.QuotasService])
], QuotasComponent);
exports.QuotasComponent = QuotasComponent;
//# sourceMappingURL=quotas.component.js.map