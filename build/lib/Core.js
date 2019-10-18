"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var Core = (function () {
    function Core() {
        this.gen = null;
        this.res = null;
        this.targetName = '';
        this.logMsgList = [];
        this.successNum = 0;
        this.failNum = 0;
        this.errorNum = 0;
    }
    Core.getTUnit = function () {
        if (!Core.tunit) {
            Core.tunit = Object.seal({
                targetAbsPath: '',
                beforeClassName: '',
                beforeNames: [],
                testNames: [],
                afterNames: [],
                afterClassName: ''
            });
        }
        return Core.tunit;
    };
    Core.prototype.println = function (methodName) {
        var star = '---';
        console.log(star + ' ' + this.targetName + '.' + methodName + ' ' + star);
    };
    Core.prototype.logTime = function () {
        if (Core.tunit.targetAbsPath) {
            var first = '/////////////////////////////////', second = '//                             //', timeStr = new Date().toLocaleString(), middle = '//   ' + timeStr + '   //';
            this.logMsgList.push(first);
            this.logMsgList.push(second);
            this.logMsgList.push(middle);
            this.logMsgList.push(second);
            this.logMsgList.push(first);
        }
    };
    Core.prototype.logMethodName = function (methodName) {
        if (Core.tunit.targetAbsPath) {
            var star = '----';
            this.logMsgList.push(star + ' ' + this.targetName + '.' + methodName + ' ' + star);
        }
    };
    Core.prototype.logResult = function (res, type, isAssert) {
        if (Core.tunit.targetAbsPath) {
            if (res === undefined || res === null) {
                res = '';
            }
            if (type === 1) {
                this.logMsgList.push('status: [Error]');
                this.logMsgList.push('error: ' + JSON.stringify(res.stack.split('\n'), null, 2));
            }
            else if (type === 2) {
                var r = void 0;
                this.logMsgList.push('status: [FAIL]');
                this.logMsgList.push('assert: false');
                if (typeof (res) == 'object' && res.stack) {
                    r = res.stack.split('\n');
                }
                else {
                    r = res;
                }
                this.logMsgList.push('error: ' + JSON.stringify(r, null, 2));
            }
            else {
                this.logMsgList.push('status: [OK]');
                if (isAssert === true)
                    this.logMsgList.push('assert: true');
                this.logMsgList.push('result: ' + JSON.stringify(res, null, 2));
            }
        }
    };
    Core.prototype.getPath = function (path) {
        var res = '';
        if (/[//]$/.test(path)) {
            res = path + 'tunit.log';
        }
        else {
            res = path + '/tunit.log';
        }
        return res;
    };
    Core.prototype.getResultNum = function () {
        return 'Runs:' + (this.successNum + this.failNum + this.errorNum) + '    Successes:' + (this.successNum) + '    Failures:' + this.failNum + '    Errors:' + this.errorNum;
    };
    Core.prototype.appendLog = function () {
        var res = this.getResultNum();
        if (Core.tunit.targetAbsPath) {
            this.logMsgList.push(res);
            this.logMsgList.push('\n\n');
            var path = this.getPath(Core.tunit.targetAbsPath);
            fs_1.default.appendFile(path, this.logMsgList.join('\n'), function (err) {
                if (err) {
                    throw err;
                }
                console.log(res);
                console.log('The log file name is ' + 'tunit.log');
            });
        }
        else {
            console.log(res);
        }
    };
    Core.prototype.next = function (result, assert) {
        var _this = this;
        if (!this.res || this.res && !this.res.done) {
            if (assert === true) {
                this.doSuccess(result, true);
            }
            else if (assert === false) {
                this.doFail(result);
            }
            else {
                if (typeof (result) === 'object' && result instanceof Error) {
                    if (result.name === 'AssertionError') {
                        this.doFail(result);
                    }
                    else {
                        this.doError(result);
                    }
                }
                else {
                    this.doSuccess(result);
                }
            }
            var promise = Promise.resolve(result);
            promise.then(function (value) {
                _this.res = _this.gen.next();
                _this.res.value = result;
                if (_this.res.done) {
                    _this.appendLog();
                }
            });
        }
    };
    Core.prototype.doSuccess = function (res, isAssert) {
        console.log('status: [OK]');
        if (isAssert === true) {
            console.log('assert: true');
        }
        this.logResult(res, 3, isAssert);
        this.successNum += 1;
    };
    Core.prototype.doFail = function (res) {
        console.log('status: [FAIL]');
        console.log('assert: false');
        this.logResult(res, 2);
        this.failNum += 1;
    };
    Core.prototype.doError = function (res) {
        console.error('status: [Error]');
        this.logResult(res, 1);
        this.errorNum += 1;
    };
    Core.prototype.generator = function (testObj) {
        var _a, beforeClassName, beforeNames, testNames, afterNames, afterClassName, _i, testNames_1, test, _b, beforeNames_1, before, _c, afterNames_1, after;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = Core.tunit, beforeClassName = _a.beforeClassName, beforeNames = _a.beforeNames, testNames = _a.testNames, afterNames = _a.afterNames, afterClassName = _a.afterClassName;
                    this.logTime();
                    if (!beforeClassName) return [3, 2];
                    this.println(beforeClassName);
                    this.logMethodName(beforeClassName);
                    return [4, testObj[beforeClassName](this.next.bind(this))];
                case 1:
                    _d.sent();
                    _d.label = 2;
                case 2:
                    if (!(testNames.length > 0)) return [3, 13];
                    _i = 0, testNames_1 = testNames;
                    _d.label = 3;
                case 3:
                    if (!(_i < testNames_1.length)) return [3, 13];
                    test = testNames_1[_i];
                    if (!(beforeNames.length > 0)) return [3, 7];
                    _b = 0, beforeNames_1 = beforeNames;
                    _d.label = 4;
                case 4:
                    if (!(_b < beforeNames_1.length)) return [3, 7];
                    before = beforeNames_1[_b];
                    this.println(before);
                    this.logMethodName(before);
                    return [4, testObj[before](this.next.bind(this))];
                case 5:
                    _d.sent();
                    _d.label = 6;
                case 6:
                    _b++;
                    return [3, 4];
                case 7:
                    this.println(test);
                    this.logMethodName(test);
                    return [4, testObj[test](this.next.bind(this))];
                case 8:
                    _d.sent();
                    if (!(afterNames.length > 0)) return [3, 12];
                    _c = 0, afterNames_1 = afterNames;
                    _d.label = 9;
                case 9:
                    if (!(_c < afterNames_1.length)) return [3, 12];
                    after = afterNames_1[_c];
                    this.println(after);
                    this.logMethodName(after);
                    return [4, testObj[after](this.next.bind(this))];
                case 10:
                    _d.sent();
                    _d.label = 11;
                case 11:
                    _c++;
                    return [3, 9];
                case 12:
                    _i++;
                    return [3, 3];
                case 13:
                    if (!afterClassName) return [3, 15];
                    this.println(afterClassName);
                    this.logMethodName(afterClassName);
                    return [4, testObj[afterClassName](this.next.bind(this))];
                case 14:
                    _d.sent();
                    _d.label = 15;
                case 15: return [2];
            }
        });
    };
    Core.prototype.run = function (testObj) {
        this.targetName = testObj.constructor.name;
        this.gen = this.generator(testObj);
        this.res = this.gen.next();
    };
    return Core;
}());
exports.default = Core;
