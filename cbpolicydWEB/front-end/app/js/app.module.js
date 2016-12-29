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
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var angular_in_memory_web_api_1 = require("angular-in-memory-web-api");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
/*Component*/
var policies_dashboard_component_1 = require("./component/policies/dashboard/policies.dashboard.component");
var policies_main_component_1 = require("./component/policies/policies.main.component");
var policies_component_1 = require("./component/policies/policy/policies.component");
var policy_groups_component_1 = require("./component/policies/policy_groups/policy.groups.component");
var quotas_component_1 = require("./component/policies/quotas/quotas.component");
var access_control_component_1 = require("./component/policies/access_control/access.control.component");
var policies_module_1 = require("./component/policies/policy/policies.module");
var quotas_module_1 = require("./component/policies/quotas/quotas.module");
var quotas_limits_module_1 = require("./component/policies/quotas_limits/quotas.limits.module");
var access_control_module_1 = require("./component/policies/access_control/access.control.module");
var policy_groups_module_1 = require("./component/policies/policy_groups/policy.groups.module");
var policy_group_members_module_1 = require("./component/policies/policy_group_members/policy.group.members.module");
var policy_members_module_1 = require("./component/policies/policy_members/policy.members.module");
var in_memory_data_policies_service_1 = require("./inMemory/in-memory-data.policies.service");
var app_component_1 = require("./app.component");
var app_routing_module_1 = require("./app-routing.module");
var material_1 = require("@angular/material");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            material_1.MaterialModule.forRoot(), policy_members_module_1.PolicyMembersModule, policies_module_1.PoliciesModule, quotas_module_1.QuotasModule,
            access_control_module_1.AccessControlModule, policy_group_members_module_1.PolicyGroupMembersModule, policy_groups_module_1.PolicyGroupsModule,
            platform_browser_1.BrowserModule, angular2_modal_1.ModalModule.forRoot(), quotas_limits_module_1.QuotasLimitsModule,
            forms_1.FormsModule, http_1.HttpModule,
            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_policies_service_1.InMemoryDataPoliciesService),
            app_routing_module_1.AppRoutingModule,
            bootstrap_1.BootstrapModalModule
        ],
        declarations: [
            app_component_1.AppComponent, policies_dashboard_component_1.PoliciesDashboardComponent,
            policies_main_component_1.PoliciesMainComponent, policies_component_1.PoliciesComponent,
            quotas_component_1.QuotasComponent, access_control_component_1.AccessControlComponent,
            policy_groups_component_1.PolicyGroupsComponent
        ],
        providers: [],
        bootstrap: [app_component_1.AppComponent],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map