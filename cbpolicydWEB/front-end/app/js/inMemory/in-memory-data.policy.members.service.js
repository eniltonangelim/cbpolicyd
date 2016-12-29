"use strict";
var InMemoryDataPolicyMembersService = (function () {
    function InMemoryDataPolicyMembersService() {
    }
    InMemoryDataPolicyMembersService.prototype.createDb = function () {
        var policyMembers = [
            { id: 1, policyID: 1, source: '', destination: '', comment: '', disabled: 0 },
            { id: 2, policyID: 2, source: '%internal_ips,%internal_domains', destination: '!%internal_domains', comment: '', disabled: 0 },
            { id: 3, policyID: 3, source: '!%internal_ips,!%internal_domains', destination: '%internal_domains', comment: '', disabled: 0 },
            { id: 4, policyID: 4, source: '%internal_ips,%internal_domains', destination: '%internal_domains', comment: '', disabled: 0 },
            { id: 5, policyID: 5, source: '@example.net', destination: '', comment: '', disabled: 0 }
        ];
        return { policyMembers: policyMembers };
    };
    return InMemoryDataPolicyMembersService;
}());
exports.InMemoryDataPolicyMembersService = InMemoryDataPolicyMembersService;
//# sourceMappingURL=in-memory-data.policy.members.service.js.map