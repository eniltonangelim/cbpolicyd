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
var access_control_service_1 = require("./access.control.service");
var access_control_1 = require("../../../model/access.control");
var policies_service_1 = require("../policies.service");
var AccessControlComponent = (function () {
    function AccessControlComponent(policiesService, accessControlService) {
        this.policiesService = policiesService;
        this.accessControlService = accessControlService;
        this.verdicts = ['HOLD', 'REJECT', 'DISCARD', 'FILTER', 'REDIRECT', 'OK'];
    }
    AccessControlComponent.prototype.getAccessControl = function () {
        var _this = this;
        this.accessControlService
            .getAccessControls()
            .then(function (accessControl) { return _this.accessControls = accessControl; });
    };
    AccessControlComponent.prototype.getPolicy = function () {
        var _this = this;
        this.policiesService
            .getPolicies()
            .then(function (policies) { return _this.policies = policies; });
    };
    AccessControlComponent.prototype.montaAccessControl = function () {
        this.newAccessControls = new access_control_1.AccessControl;
        this.newAccessControls.id = null;
        this.newAccessControls.policyID = null;
        this.newAccessControls.name = null;
        this.newAccessControls.verdict = null;
        this.newAccessControls.data = null;
        this.newAccessControls.comment = null;
        this.newAccessControls.disabled = 0;
    };
    AccessControlComponent.prototype.addAccessControls = function () {
        var _this = this;
        if (!this.newAccessControls.name && !this.newAccessControls.policyID) {
            return null;
        }
        this.accessControlService.create(this.newAccessControls)
            .then(function (acl) {
            _this.accessControls.push(acl);
            _this.montaAccessControl();
        });
    };
    AccessControlComponent.prototype.deleteAccessControl = function (accessControl) {
        var _this = this;
        this.accessControlService.delete(Number(accessControl.id)).then(function (delAcl) {
            _this.accessControls.splice(_this.accessControls.indexOf(accessControl), 1);
        });
    };
    AccessControlComponent.prototype.ngOnInit = function () {
        this.getAccessControl();
        this.montaAccessControl();
        this.getPolicy();
    };
    AccessControlComponent.prototype.clearAccessControl = function () {
        this.montaAccessControl();
    };
    return AccessControlComponent;
}());
AccessControlComponent = __decorate([
    core_1.Component({
        selector: 'accessControl-component',
        templateUrl: 'app/view/access_control/access.control.component.html'
    }),
    __metadata("design:paramtypes", [policies_service_1.PoliciesService, access_control_service_1.AccessControlService])
], AccessControlComponent);
exports.AccessControlComponent = AccessControlComponent;
//# sourceMappingURL=access.control.component.js.map