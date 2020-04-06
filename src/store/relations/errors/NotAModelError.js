export default class NotAModelError extends Error {
    constructor(obj) {
        super(`[${obj.constructor.name}] is not a Model instance.`);
    }
}
