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
var PoliciesDashboardComponent = (function () {
    function PoliciesDashboardComponent(policiesService) {
        this.policiesService = policiesService;
    }
    PoliciesDashboardComponent.prototype.ngOnInit = function () { };
    return PoliciesDashboardComponent;
}());
PoliciesDashboardComponent = __decorate([
    core_1.Component({
        selector: 'policies-dashboard',
        templateUrl: 'app/view/policies/policies.dashboard.component.html'
    }),
    __metadata("design:paramtypes", [policies_service_1.PoliciesService])
], PoliciesDashboardComponent);
exports.PoliciesDashboardComponent = PoliciesDashboardComponent;
//# sourceMappingURL=policies.dashboard.component.js.map