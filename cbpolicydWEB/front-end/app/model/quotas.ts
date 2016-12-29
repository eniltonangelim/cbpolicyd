
export class Quotas {
    constructor(
        public id?: Number,
        public policyID?: Number,
        public track?: String,
        public period?: Number,
        public verdict?: String,
        public data?: String,
        public lastQuota?: Number,
        public comment?: String,
        public disabled?: Boolean
    ){}
}