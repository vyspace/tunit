import AssertionError from './AssertionError';

export default class Assert {
	constructor() {
		throw new Error('This is a static class!');
	}
	static fail(msg?:string):void {
		msg = msg || 'fail';
		throw new AssertionError(msg);
	}
	static assertNull(obj:any, msg?:string):boolean|undefined {
		msg = msg || 'The first parameter is not null.';
		if(obj !== null ) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertNotNull(obj:any, msg?:string):boolean|undefined {
		msg = msg || 'The first parameter is null.';
		if(obj === null ) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertUndefined(obj:any, msg?:string):boolean|undefined {
		msg = msg || 'The first parameter is not undefined.';
		if(obj !== undefined ) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertNotUndefined(obj:any, msg?:string):boolean|undefined {
		msg = msg || 'The first parameter is undefined.';
		if(obj === undefined ) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertNullOrUndefined(obj:any, msg?:string):boolean|undefined {
		msg = msg || 'The first parameter is not undefined or null';
		if(obj !== undefined && obj !== null ) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertNotNullAndUndefined(obj:any, msg?:string):boolean|undefined {
		msg = msg || 'The first parameter is undefined or null';
		if(obj === undefined || obj === null ) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertSame(expected:any, actual:any, msg?:string):boolean|undefined {
		msg = msg || 'Two parameters are not same.';
		if(expected != actual) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertNotSame(expected:any, actual:any, msg?:string):boolean|undefined {
		msg = msg || 'Two parameters are same.'
		if(expected == actual) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertEquals(expected:any, actual:any, msg?:string):boolean|undefined {
		msg = msg || 'Two parameters are not equal.';
		if(expected !== actual) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertNotEquals(expected:any, actual:any, msg?:string):boolean|undefined {
		msg = msg || 'Two parameters are equal.'
		if(expected === actual) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertTrue(condition:boolean, msg?:string):boolean|undefined {
		msg = msg || 'The first parameter is not true.'
		if(condition !== true) {
			throw new AssertionError(msg);
		}
		return true;
	}
	static assertFalse(condition:boolean, msg?:string):boolean|undefined {
		msg = msg || 'The first parameter is not false.'
		if(condition !== false) {
			throw new AssertionError(msg);
		}
		return true;
	}
}

// let xxx:any
// try {
// 	xxx = Assert.assertSame(1, '1');
// 	console.log(xxx);
// }
// catch(err) {
// 	//const s = JSON.stringify(err.stack, null, 2);
// 	console.error(xxx);
// 	console.error(err.stack);
// }
