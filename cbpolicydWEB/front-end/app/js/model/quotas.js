"use strict";
var Quotas = (function () {
    function Quotas(id, policyID, name, track, period, verdict, data, lastQuota, comment, disabled) {
        this.id = id;
        this.policyID = policyID;
        this.name = name;
        this.track = track;
        this.period = period;
        this.verdict = verdict;
        this.data = data;
        this.lastQuota = lastQuota;
        this.comment = comment;
        this.disabled = disabled;
    }
    return Quotas;
}());
exports.Quotas = Quotas;
//# sourceMappingURL=quotas.js.map