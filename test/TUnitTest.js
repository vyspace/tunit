"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
let TUnitTest = class TUnitTest {
    init(next) {
        setTimeout(function () {
            try {
                console.log('This is BeforeClass Method');
                next();
            }
            catch (err) {
                next(err);
            }
        }, 2000);
    }
    beforeTesting(next) {
        console.log('This is Before Method');
        try {
            const assert = index_1.Assert.assertNotNull(null, 'This is a null result');
            next(null, assert);
        }
        catch (err) {
            next(err);
        }
    }
    afterTesting(next) {
        console.log('This is After Method');
        try {
            throw new Error('This is a error mssages');
            next();
        }
        catch (err) {
            next(err);
        }
    }
    testing(next) {
        console.log('This is Test Method');
        setTimeout(function () {
            console.log('Test Method is executing after 1 sec');
            next('testing');
        }, 1000);
    }
    end(next) {
        console.log('This is AfterClass Method');
        next();
    }
};
__decorate([
    index_1.BeforeClass,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], TUnitTest.prototype, "init", null);
__decorate([
    index_1.Before,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], TUnitTest.prototype, "beforeTesting", null);
__decorate([
    index_1.After,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], TUnitTest.prototype, "afterTesting", null);
__decorate([
    index_1.Test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], TUnitTest.prototype, "testing", null);
__decorate([
    index_1.AfterClass,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function]),
    __metadata("design:returntype", void 0)
], TUnitTest.prototype, "end", null);
TUnitTest = __decorate([
    index_1.TUnit() //TUnit has a parameter, the type is string. It's a absolute path of the log file.
], TUnitTest);
exports.default = TUnitTest;
