"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Core_1 = __importDefault(require("./Core"));
function TUnit(absPath) {
    if (!absPath) {
        absPath = '';
    }
    return (target) => {
        const tunit = Core_1.default.getTUnit(), obj = new target();
        tunit.targetAbsPath = absPath;
        const core = new Core_1.default();
        core.run(obj);
    };
}
exports.default = TUnit;
