export default class NotAttachedError extends Error {
    constructor() {
        super('The given models are not attached.');
    }
}
