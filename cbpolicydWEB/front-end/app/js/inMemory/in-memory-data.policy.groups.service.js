"use strict";
var InMemoryDataPolicyGroupsService = (function () {
    function InMemoryDataPolicyGroupsService() {
    }
    InMemoryDataPolicyGroupsService.prototype.createDb = function () {
        var policyGroups = [
            { id: 1, name: 'internal_ips', disabled: 0, comment: '' },
            { id: 2, name: 'internal_domains', disabled: 0, comment: '' }
        ];
        return { policyGroups: policyGroups };
    };
    return InMemoryDataPolicyGroupsService;
}());
exports.InMemoryDataPolicyGroupsService = InMemoryDataPolicyGroupsService;
//# sourceMappingURL=in-memory-data.policy.groups.service.js.map