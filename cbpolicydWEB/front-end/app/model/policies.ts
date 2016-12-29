export class Policies {
    constructor(
        public id?: Number,
        public name?: String,
        public priority?: Number,
        public description?: String,
        public disabled?: Boolean,
        public readonly?: Boolean,
    ){}
}