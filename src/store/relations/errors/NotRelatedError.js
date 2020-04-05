export default class NotRelatedError extends Error {
    constructor(first, second) {
        super(`[${first}] and [${second}] are not related.`);
    }
}
