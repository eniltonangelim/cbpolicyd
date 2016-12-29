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
var policies_service_1 = require("./policies.service");
var PoliciesMainComponent = (function () {
    function PoliciesMainComponent(policiesService) {
        this.policiesService = policiesService;
    }
    PoliciesMainComponent.prototype.ngOnInit = function () {
    };
    return PoliciesMainComponent;
}());
PoliciesMainComponent = __decorate([
    core_1.Component({
        selector: 'policies-main',
        templateUrl: 'app/view/policies/policies.main.component.html'
    }),
    __metadata("design:paramtypes", [policies_service_1.PoliciesService])
], PoliciesMainComponent);
exports.PoliciesMainComponent = PoliciesMainComponent;
//# sourceMappingURL=policies.main.component.js.map