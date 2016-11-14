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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var selective_preload_strategy_1 = require('../../selective-preload-strategy');
var policies_service_1 = require('./policies.service');
var PoliciesMainComponent = (function () {
    function PoliciesMainComponent(policiesService, route, router, preloadStrategy) {
        this.policiesService = policiesService;
        this.route = route;
        this.router = router;
        this.preloadStrategy = preloadStrategy;
    }
    PoliciesMainComponent.prototype.ngOnInit = function () {
    };
    PoliciesMainComponent = __decorate([
        core_1.Component({
            selector: 'policies-main',
            templateUrl: 'app/view/policies/policies.main.component.html',
            //styleUrls: ['app/view/policies/policies.main.component.css'],
            providers: [policies_service_1.PoliciesService]
        }), 
        __metadata('design:paramtypes', [policies_service_1.PoliciesService, router_1.ActivatedRoute, router_1.Router, selective_preload_strategy_1.PreloadSelectedModules])
    ], PoliciesMainComponent);
    return PoliciesMainComponent;
}());
exports.PoliciesMainComponent = PoliciesMainComponent;
//# sourceMappingURL=policies.main.component.js.map