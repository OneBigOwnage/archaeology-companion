export default class NotAttachedError extends Error {
    constructor(first, second) {
        super(`Cannot detach [${first.constructor.name + first.slug()}] and [${second.constructor.name + second.slug()}] because they aren't attached.`);
    }
}
