"use strict";
var PolicyMembers = (function () {
    function PolicyMembers(id, policyID, source, destination, comment, disabled) {
        this.id = id;
        this.policyID = policyID;
        this.source = source;
        this.destination = destination;
        this.comment = comment;
        this.disabled = disabled;
    }
    return PolicyMembers;
}());
exports.PolicyMembers = PolicyMembers;
//# sourceMappingURL=policy.members.js.map