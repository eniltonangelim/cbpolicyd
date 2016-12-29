"use strict";
var InMemoryDataPolicyGroupMembersService = (function () {
    function InMemoryDataPolicyGroupMembersService() {
    }
    InMemoryDataPolicyGroupMembersService.prototype.createDb = function () {
        var policyGroupMembers = [
            { id: 1, policyGroupID: 1, member: '10.0.0.0/8', disabled: 0, comment: '' },
            { id: 2, policyGroupID: 2, member: '@example.org', disabled: 0, comment: '' },
            { id: 3, policyGroupID: 2, member: '@example.com', disabled: 0, comment: '' }
        ];
        return { policyGroupMembers: policyGroupMembers };
    };
    return InMemoryDataPolicyGroupMembersService;
}());
exports.InMemoryDataPolicyGroupMembersService = InMemoryDataPolicyGroupMembersService;
//# sourceMappingURL=in-memory-data.policy.group.members.service.js.map