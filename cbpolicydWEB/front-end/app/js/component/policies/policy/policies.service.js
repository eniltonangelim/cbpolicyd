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
require("../../../rxjs/rxjs-extensions");
var PoliciesService = (function () {
    function PoliciesService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.policiesURL = 'api/policies';
    }
    PoliciesService.prototype.getPolicies = function () {
        return this.http.get(this.policiesURL)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    PoliciesService.prototype.getPolicy = function (id) {
        var url = this.policiesURL + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    PoliciesService.prototype.delete = function (id) {
        var url = this.policiesURL + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    PoliciesService.prototype.create = function (policy) {
        return this.http
            .post(this.policiesURL, JSON.stringify(policy), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    PoliciesService.prototype.update = function (policies) {
        var url = this.policiesURL + "/" + policies.id;
        return this.http
            .put(url, JSON.stringify(policies), { headers: this.headers })
            .toPromise()
            .then(function () { return policies; })
            .catch(this.handleError);
    };
    PoliciesService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return PoliciesService;
}());
PoliciesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PoliciesService);
exports.PoliciesService = PoliciesService;
//# sourceMappingURL=policies.service.js.map