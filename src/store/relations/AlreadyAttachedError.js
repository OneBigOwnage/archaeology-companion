export default class AlreadyAttachedError extends Error {
    constructor() {
        super('The given models are already attached.');
    }
}
