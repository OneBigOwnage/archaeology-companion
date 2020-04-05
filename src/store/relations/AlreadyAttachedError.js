export default class AlreadyAttachedError extends Error {
    constructor(first, second) {
        super(`[${first.constructor.name + first.slug()}] and [${second.constructor.name + second.slug()}] are already attached.`);
    }
}
