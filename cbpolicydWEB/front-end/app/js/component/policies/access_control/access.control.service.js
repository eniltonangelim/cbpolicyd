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
var AccessControlService = (function () {
    function AccessControlService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.accessControlURL = 'api/accessControl';
    }
    AccessControlService.prototype.getAccessControls = function () {
        return this.http.get(this.accessControlURL)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    AccessControlService.prototype.getAccessControl = function (id) {
        var url = this.accessControlURL + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; });
    };
    AccessControlService.prototype.delete = function (id) {
        var url = this.accessControlURL + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    AccessControlService.prototype.create = function (accessControl) {
        console.log(accessControl);
        return this.http
            .post(this.accessControlURL, JSON.stringify(accessControl), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    AccessControlService.prototype.update = function (accessControl) {
        var url = this.accessControlURL + "/" + accessControl.id;
        return this.http
            .put(url, JSON.stringify(accessControl), { headers: this.headers })
            .toPromise()
            .then(function () { return accessControl; })
            .catch(this.handleError);
    };
    AccessControlService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return AccessControlService;
}());
AccessControlService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AccessControlService);
exports.AccessControlService = AccessControlService;
//# sourceMappingURL=access.control.service.js.map