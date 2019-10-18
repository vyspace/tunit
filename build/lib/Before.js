"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Core_1 = __importDefault(require("./Core"));
function Before(target, propertyKey, descriptor) {
    var tunit = Core_1.default.getTUnit();
    tunit.beforeNames.push(propertyKey);
}
exports.default = Before;
