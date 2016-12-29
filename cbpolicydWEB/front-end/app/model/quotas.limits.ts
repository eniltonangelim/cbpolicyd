export class QuotasLimits {
    constructor(
        public id?: Number,
        public quotasID?: Number,
        public types?: String,
        public counterLimit?: Number,
        public comment?: String,
        public disabled?: Number
    ){}
}