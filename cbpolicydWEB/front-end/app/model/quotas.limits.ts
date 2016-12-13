import { Quotas } from './quotas'

export class QuotasLimits {
    constructor(
        public id?: Number,
        public quotasID?: Quotas,
        public types?: String,
        public counterLimit?: Number,
        public comment?: String,
        public disabled?: Number
    ){}
}