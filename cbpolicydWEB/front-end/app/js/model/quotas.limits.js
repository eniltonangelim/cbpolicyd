"use strict";
var QuotasLimits = (function () {
    function QuotasLimits(id, quotasID, types, counterLimit, comment, disabled) {
        this.id = id;
        this.quotasID = quotasID;
        this.types = types;
        this.counterLimit = counterLimit;
        this.comment = comment;
        this.disabled = disabled;
    }
    return QuotasLimits;
}());
exports.QuotasLimits = QuotasLimits;
//# sourceMappingURL=quotas.limits.js.map