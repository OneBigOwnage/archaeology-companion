export default class NotAModelError extends Error {
    constructor(obj) {
        super(`[${obj}] is not a Model instance.`);
    }
}
