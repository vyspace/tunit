"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AssertionError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'AssertionError';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AssertionError;
