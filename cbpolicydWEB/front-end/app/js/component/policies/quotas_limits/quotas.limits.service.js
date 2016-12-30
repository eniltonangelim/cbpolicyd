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
var quotas_limits_1 = require("../../../model/quotas.limits");
require("../../../rxjs/rxjs-extensions");
var QuotasLimitsService = (function () {
    function QuotasLimitsService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.quotasLimitsURL = 'api/quotasLimits';
    }
    QuotasLimitsService.prototype.getQuotasLimits = function () {
        return this.http.get(this.quotasLimitsURL)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    QuotasLimitsService.prototype.getPolicyMember = function (id) {
        var url = this.quotasLimitsURL + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    QuotasLimitsService.prototype.getQuotasLimitsbyQuotasID = function (id) {
        var url = this.quotasLimitsURL + "?quotasID=" + id;
        console.log(url);
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    QuotasLimitsService.prototype.delete = function (id) {
        var url = this.quotasLimitsURL + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    QuotasLimitsService.prototype.create = function (quotasLimits) {
        console.log(quotasLimits);
        return this.http
            .post(this.quotasLimitsURL, JSON.stringify(quotasLimits), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    QuotasLimitsService.prototype.update = function (quotasLimits) {
        var url = this.quotasLimitsURL + "/" + quotasLimits.id;
        return this.http
            .put(url, JSON.stringify(quotasLimits), { headers: this.headers })
            .toPromise()
            .then(function () { return quotas_limits_1.QuotasLimits; })
            .catch(this.handleError);
    };
    QuotasLimitsService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return QuotasLimitsService;
}());
QuotasLimitsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], QuotasLimitsService);
exports.QuotasLimitsService = QuotasLimitsService;
//# sourceMappingURL=quotas.limits.service.js.map