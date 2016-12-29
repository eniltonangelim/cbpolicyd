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
var policy_groups_service_1 = require("./policy.groups.service");
var policy_group_members_component_1 = require("../policy_group_members/policy.group.members.component");
var PolicyGroupsModule = (function () {
    function PolicyGroupsModule() {
    }
    return PolicyGroupsModule;
}());
PolicyGroupsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [],
        providers: [policy_groups_service_1.PolicyGroupsService],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
        entryComponents: [policy_group_members_component_1.PolicyGroupMembersComponent]
    }),
    __metadata("design:paramtypes", [])
], PolicyGroupsModule);
exports.PolicyGroupsModule = PolicyGroupsModule;
//# sourceMappingURL=policy.groups.module.js.map