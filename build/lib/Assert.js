"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AssertionError_1 = __importDefault(require("./AssertionError"));
class Assert {
    constructor() {
        throw new Error('This is a static class!');
    }
    static fail(msg) {
        msg = msg || 'fail';
        throw new AssertionError_1.default(msg);
    }
    static assertNull(obj, msg) {
        msg = msg || 'The first parameter is not null.';
        if (obj !== null) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertNotNull(obj, msg) {
        msg = msg || 'The first parameter is null.';
        if (obj === null) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertUndefined(obj, msg) {
        msg = msg || 'The first parameter is not undefined.';
        if (obj !== undefined) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertNotUndefined(obj, msg) {
        msg = msg || 'The first parameter is undefined.';
        if (obj === undefined) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertNullOrUndefined(obj, msg) {
        msg = msg || 'The first parameter is not undefined or null';
        if (obj !== undefined && obj !== null) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertNotNullAndUndefined(obj, msg) {
        msg = msg || 'The first parameter is undefined or null';
        if (obj === undefined || obj === null) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertSame(expected, actual, msg) {
        msg = msg || 'Two parameters are not same.';
        if (expected != actual) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertNotSame(expected, actual, msg) {
        msg = msg || 'Two parameters are same.';
        if (expected == actual) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertEquals(expected, actual, msg) {
        msg = msg || 'Two parameters are not equal.';
        if (expected !== actual) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertNotEquals(expected, actual, msg) {
        msg = msg || 'Two parameters are equal.';
        if (expected === actual) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertTrue(condition, msg) {
        msg = msg || 'The first parameter is not true.';
        if (condition !== true) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
    static assertFalse(condition, msg) {
        msg = msg || 'The first parameter is not false.';
        if (condition !== false) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    }
}
exports.default = Assert;
