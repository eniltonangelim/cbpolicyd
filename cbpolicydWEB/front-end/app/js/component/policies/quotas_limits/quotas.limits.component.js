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
var quotas_limits_service_1 = require("./quotas.limits.service");
var quotas_limits_1 = require("../../../model/quotas.limits");
var CustomModalContext = (function (_super) {
    __extends(CustomModalContext, _super);
    function CustomModalContext() {
        return _super.apply(this, arguments) || this;
    }
    return CustomModalContext;
}(bootstrap_1.BSModalContext));
exports.CustomModalContext = CustomModalContext;
var QuotasLimitsComponent = (function () {
    function QuotasLimitsComponent(dialog, quotasLimitsService) {
        this.dialog = dialog;
        this.quotasLimitsService = quotasLimitsService;
        this.title = 'Quotas:';
        this.quotas = dialog.context;
        dialog.setCloseGuard(this);
    }
    QuotasLimitsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.quotasLimitsService.getQuotasLimitsbyQuotasID(Number(this.quotas.quota.id))
            .then(function (quotasLimits) { return _this.quotasLimits = quotasLimits; });
        this.montaQuotasLimits();
    };
    QuotasLimitsComponent.prototype.next = function (tabID) {
    };
    QuotasLimitsComponent.prototype.beforeDismiss = function () {
        return true;
    };
    QuotasLimitsComponent.prototype.beforeClose = function () {
        return null;
    };
    QuotasLimitsComponent.prototype.close = function () {
        this.dialog.close();
    };
    QuotasLimitsComponent.prototype.closeEvent = function (msg) {
        this.dialog.close();
    };
    QuotasLimitsComponent.prototype.addQuotasLimits = function () {
        var _this = this;
        if (!this.newQuotasLimits.quotasID) {
            return null;
        }
        this.quotasLimitsService.create(this.newQuotasLimits).then(function (quota) {
            _this.quotasLimits.push(quota);
            _this.montaQuotasLimits();
        });
    };
    QuotasLimitsComponent.prototype.removeQuotasLimits = function (quotasLimits) {
        var _this = this;
        this.quotasLimitsService.delete(Number(quotasLimits.id)).then(function (delQuotasLimits) {
            _this.quotasLimits.splice(_this.quotasLimits.indexOf(quotas_limits_1.QuotasLimits), 1);
        });
    };
    QuotasLimitsComponent.prototype.montaQuotasLimits = function () {
        this.newQuotasLimits = new quotas_limits_1.QuotasLimits;
        this.newQuotasLimits.id = null;
        this.newQuotasLimits.quotasID = this.quotas.quota.id;
        this.newQuotasLimits.counterLimit = null;
        this.newQuotasLimits.comment = null;
        this.newQuotasLimits.disabled = 0;
    };
    return QuotasLimitsComponent;
}());
QuotasLimitsComponent = __decorate([
    core_1.Component({
        selector: 'modal',
        templateUrl: 'app/view/quotas/quotas.limits.component.html',
        styleUrls: ['app/view/quotas/quotas.limits.component.css']
    }),
    __metadata("design:paramtypes", [angular2_modal_1.DialogRef, quotas_limits_service_1.QuotasLimitsService])
], QuotasLimitsComponent);
exports.QuotasLimitsComponent = QuotasLimitsComponent;
//# sourceMappingURL=quotas.limits.component.js.map