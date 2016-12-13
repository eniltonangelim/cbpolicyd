"use strict";
var PolicyGroupMembers = (function () {
    function PolicyGroupMembers(id, policyGroupID, member, disabled, comment) {
        this.id = id;
        this.policyGroupID = policyGroupID;
        this.member = member;
        this.disabled = disabled;
        this.comment = comment;
    }
    return PolicyGroupMembers;
}());
exports.PolicyGroupMembers = PolicyGroupMembers;
//# sourceMappingURL=policy.group.members.js.map