"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AssertionError_1 = __importDefault(require("./AssertionError"));
var Assert = (function () {
    function Assert() {
        throw new Error('This is a static class!');
    }
    Assert.fail = function (msg) {
        msg = msg || 'fail';
        throw new AssertionError_1.default(msg);
    };
    Assert.assertNull = function (obj, msg) {
        msg = msg || 'The first parameter is not null.';
        if (obj !== null) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertNotNull = function (obj, msg) {
        msg = msg || 'The first parameter is null.';
        if (obj === null) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertUndefined = function (obj, msg) {
        msg = msg || 'The first parameter is not undefined.';
        if (obj !== undefined) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertNotUndefined = function (obj, msg) {
        msg = msg || 'The first parameter is undefined.';
        if (obj === undefined) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertNullOrUndefined = function (obj, msg) {
        msg = msg || 'The first parameter is not undefined or null';
        if (obj !== undefined && obj !== null) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertNotNullAndUndefined = function (obj, msg) {
        msg = msg || 'The first parameter is undefined or null';
        if (obj === undefined || obj === null) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertSame = function (expected, actual, msg) {
        msg = msg || 'Two parameters are not same.';
        if (expected != actual) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertNotSame = function (expected, actual, msg) {
        msg = msg || 'Two parameters are same.';
        if (expected == actual) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertEquals = function (expected, actual, msg) {
        msg = msg || 'Two parameters are not equal.';
        if (expected !== actual) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertNotEquals = function (expected, actual, msg) {
        msg = msg || 'Two parameters are equal.';
        if (expected === actual) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertTrue = function (condition, msg) {
        msg = msg || 'The first parameter is not true.';
        if (condition !== true) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    Assert.assertFalse = function (condition, msg) {
        msg = msg || 'The first parameter is not false.';
        if (condition !== false) {
            throw new AssertionError_1.default(msg);
        }
        return true;
    };
    return Assert;
}());
exports.default = Assert;
