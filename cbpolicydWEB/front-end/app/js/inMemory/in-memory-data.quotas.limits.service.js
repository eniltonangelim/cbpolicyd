"use strict";
var InMemoryDataQuotasLimitsService = (function () {
    function InMemoryDataQuotasLimitsService() {
    }
    InMemoryDataQuotasLimitsService.prototype.createDb = function () {
        var quotasLimits = [
            { id: 1, quotasID: 1, type: 'MessageCount', counterLimit: 10, comment: '', disabled: 0 },
            { id: 2, quotasID: 1, type: 'MessageCumulativeSize', counterLimit: 8000, comment: '', disabled: 0 },
            { id: 3, quotasID: 2, type: 'MessageCount', counterLimit: 12, comment: '', disabled: 0 },
            { id: 4, quotasID: 1, type: 'MessageCount', counterLimit: 15, comment: '', disabled: 1 }
        ];
        return { quotasLimits: quotasLimits };
    };
    return InMemoryDataQuotasLimitsService;
}());
exports.InMemoryDataQuotasLimitsService = InMemoryDataQuotasLimitsService;
//# sourceMappingURL=in-memory-data.quotas.limits.service.js.map