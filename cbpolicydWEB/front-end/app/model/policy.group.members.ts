import { PolicyGroups } from './policy.groups';

export class PolicyGroupMembers {
    constructor(
        public id?: Number,
        public policyGroupID?: PolicyGroups,
        public member?: String,
        public disabled?: Boolean,
        public comment?: String 
    ){}
}