export default class AssertionError extends Error {
	constructor(msg:string) {
		super(msg);
		this.name = 'AssertionError';
		Error.captureStackTrace(this, this.constructor);
	}
}