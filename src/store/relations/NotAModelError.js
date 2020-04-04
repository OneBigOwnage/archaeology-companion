export default class NotAModelError extends Error {
    constructor() {
        super('One of the given arguments is not a Model instance.');
    }
}
