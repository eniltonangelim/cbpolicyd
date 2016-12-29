"use strict";
var AccessControl = (function () {
    function AccessControl(id, policyID, name, verdict, data, comment, disabled) {
        this.id = id;
        this.policyID = policyID;
        this.name = name;
        this.verdict = verdict;
        this.data = data;
        this.comment = comment;
        this.disabled = disabled;
    }
    return AccessControl;
}());
exports.AccessControl = AccessControl;
//# sourceMappingURL=access.control.js.map