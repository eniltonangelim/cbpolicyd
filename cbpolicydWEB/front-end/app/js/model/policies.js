"use strict";
var Policies = (function () {
    function Policies(id, name, priority, description, disabled, readonly) {
        this.id = id;
        this.name = name;
        this.priority = priority;
        this.description = description;
        this.disabled = disabled;
        this.readonly = readonly;
    }
    return Policies;
}());
exports.Policies = Policies;
//# sourceMappingURL=policies.js.map