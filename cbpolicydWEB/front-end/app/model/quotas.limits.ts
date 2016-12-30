export class QuotasLimits {
    constructor(
        public id?: Number,
        public quotasID?: Number,
        public type?: String,
        public counterLimit?: Number,
        public comment?: String,
        public disabled?: Number
    ){}
}