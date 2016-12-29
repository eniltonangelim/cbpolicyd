import { Policies } from './policies';

export class AccessControl {

    constructor(
        public id?: Number,
        public policyID?: Policies,
        public name?: String,
        public verdict?: String,
        public data?: String,
        public comment?: String,
        public disabled?: Boolean
    ){}

}