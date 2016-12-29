"use strict";
var InMemoryDataQuotasService = (function () {
    function InMemoryDataQuotasService() {
    }
    InMemoryDataQuotasService.prototype.createDb = function () {
        var quotas = [
            { id: 1, policyGroupID: 5, name: 'Recipient quotas', track: 'Recipient:user@domain', period: 3600, verdict: 'REJECT', data: '', lastQuota: 0, comment: '', disabled: 0 },
            { id: 2, policyGroupID: 5, name: 'Quota on all /24s', track: 'SenderIP:/24', period: 3600, verdict: 'REJECT', data: '', lastQuota: 0, comment: '', disabled: 0 }
        ];
        return { quotas: quotas };
    };
    return InMemoryDataQuotasService;
}());
exports.InMemoryDataQuotasService = InMemoryDataQuotasService;
//# sourceMappingURL=in-memory-data.quotas.service.js.map