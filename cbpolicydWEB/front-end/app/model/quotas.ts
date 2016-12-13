import { Policies } from './policies';

export class Quotas {
    constructor(
        public id?: Number,
        public policyID?: Policies,
        public track?: String,
        public period?: Number,
        public verdict?: String,
        public data?: String,
        public lastQuota?: Number,
        public comment?: String,
        public disabled?: Boolean
    ){}
}