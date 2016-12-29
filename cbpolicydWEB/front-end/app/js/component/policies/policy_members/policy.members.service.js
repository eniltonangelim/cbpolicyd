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
var policy_members_1 = require("../../../model/policy.members");
require("../../../rxjs/rxjs-extensions");
var PolicyMembersService = (function () {
    function PolicyMembersService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.policyMembersURL = 'api/policyMembers';
    }
    PolicyMembersService.prototype.getPolicyMembers = function () {
        return this.http.get(this.policyMembersURL)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    PolicyMembersService.prototype.getPolicyMember = function (id) {
        var url = this.policyMembersURL + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    PolicyMembersService.prototype.getPolicyMembersbyPolicyID = function (id) {
        var url = this.policyMembersURL + "?policyID=" + id;
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    PolicyMembersService.prototype.delete = function (id) {
        var url = this.policyMembersURL + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PolicyMembersService.prototype.create = function (policyMembers) {
        console.log(policyMembers);
        return this.http
            .post(this.policyMembersURL, JSON.stringify(policyMembers), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    PolicyMembersService.prototype.update = function (policyMembers) {
        var url = this.policyMembersURL + "/" + policyMembers.id;
        return this.http
            .put(url, JSON.stringify(policy_members_1.PolicyMembers), { headers: this.headers })
            .toPromise()
            .then(function () { return policy_members_1.PolicyMembers; })
            .catch(this.handleError);
    };
    PolicyMembersService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return PolicyMembersService;
}());
PolicyMembersService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PolicyMembersService);
exports.PolicyMembersService = PolicyMembersService;
//# sourceMappingURL=policy.members.service.js.map