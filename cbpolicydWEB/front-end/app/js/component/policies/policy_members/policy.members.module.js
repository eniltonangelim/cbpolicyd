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
var common_1 = require("@angular/common");
var material_1 = require("@angular/material");
var policy_members_service_1 = require("./policy.members.service");
var policy_members_component_1 = require("./policy.members.component");
var PolicyMembersModule = (function () {
    function PolicyMembersModule() {
    }
    return PolicyMembersModule;
}());
PolicyMembersModule = __decorate([
    core_1.NgModule({
        imports: [
            material_1.MaterialModule.forRoot(), common_1.CommonModule
        ],
        declarations: [policy_members_component_1.PolicyMembersComponent],
        providers: [policy_members_service_1.PolicyMembersService],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    }),
    __metadata("design:paramtypes", [])
], PolicyMembersModule);
exports.PolicyMembersModule = PolicyMembersModule;
//# sourceMappingURL=policy.members.module.js.map