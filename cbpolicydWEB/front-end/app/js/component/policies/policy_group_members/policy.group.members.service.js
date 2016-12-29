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
var http_1 = require("@angular/http");
var policy_group_members_1 = require("../../../model/policy.group.members");
require("../../../rxjs/rxjs-extensions");
var PolicyGroupMembersService = (function () {
    function PolicyGroupMembersService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.policyGroupMembersURL = 'api/policyGroupMembers';
    }
    PolicyGroupMembersService.prototype.getPolicyGroupMembers = function () {
        return this.http.get(this.policyGroupMembersURL)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    PolicyGroupMembersService.prototype.getPolicyMember = function (id) {
        var url = this.policyGroupMembersURL + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    PolicyGroupMembersService.prototype.getPolicyGroupMembersbyPolicyGroupID = function (id) {
        var url = this.policyGroupMembersURL + "?policyGroupID=" + id;
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    PolicyGroupMembersService.prototype.delete = function (id) {
        var url = this.policyGroupMembersURL + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PolicyGroupMembersService.prototype.create = function (policyGroupMembers) {
        console.log(policyGroupMembers);
        return this.http
            .post(this.policyGroupMembersURL, JSON.stringify(policyGroupMembers), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    PolicyGroupMembersService.prototype.update = function (policyGroupMembers) {
        var url = this.policyGroupMembersURL + "/" + policyGroupMembers.id;
        return this.http
            .put(url, JSON.stringify(policy_group_members_1.PolicyGroupMembers), { headers: this.headers })
            .toPromise()
            .then(function () { return policy_group_members_1.PolicyGroupMembers; })
            .catch(this.handleError);
    };
    PolicyGroupMembersService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return PolicyGroupMembersService;
}());
PolicyGroupMembersService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PolicyGroupMembersService);
exports.PolicyGroupMembersService = PolicyGroupMembersService;
//# sourceMappingURL=policy.group.members.service.js.map