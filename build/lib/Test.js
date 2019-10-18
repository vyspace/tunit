"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = __importDefault(require("./Core"));
function Test(target, propertyKey, descriptor) {
    var tunit = Core_1.default.getTUnit();
    tunit.testNames.push(propertyKey);
}
exports.default = Test;
