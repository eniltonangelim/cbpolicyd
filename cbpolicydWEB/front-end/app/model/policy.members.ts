import { Policies } from './policies';

export class PolicyMembers {
    constructor(
        public id?: Number,
        public policyID?: Policies,
        public source?: String,
        public destination?: String,
        public comment?: String,
        public disabled?: Number
    ){}
}