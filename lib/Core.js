"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class Core {
    constructor() {
        this.gen = null;
        this.res = null;
        this.targetName = '';
        this.logMsgList = [];
        this.successNum = 0;
        this.failNum = 0;
        this.errorNum = 0;
    }
    static getTUnit() {
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
    }
    println(methodName) {
        let star = '---';
        console.log(star + ' ' + this.targetName + '.' + methodName + ' ' + star);
    }
    logTime() {
        if (Core.tunit.targetAbsPath) {
            const first = '/////////////////////////////////', second = '//                             //', timeStr = new Date().toLocaleString(), middle = '//   ' + timeStr + '   //';
            this.logMsgList.push(first);
            this.logMsgList.push(second);
            this.logMsgList.push(middle);
            this.logMsgList.push(second);
            this.logMsgList.push(first);
        }
    }
    logMethodName(methodName) {
        if (Core.tunit.targetAbsPath) {
            let star = '----';
            this.logMsgList.push(star + ' ' + this.targetName + '.' + methodName + ' ' + star);
        }
    }
    logResult(res, type, isAssert) {
        if (Core.tunit.targetAbsPath) {
            if (res === undefined || res === null) {
                res = '';
            }
            if (type === 1) {
                this.logMsgList.push('status: [Error]');
                this.logMsgList.push('error: ' + JSON.stringify(res.stack.split('\n'), null, 2));
            }
            else if (type === 2) {
                let r;
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
    }
    getPath(path) {
        let res = '';
        if (/[//]$/.test(path)) {
            res = path + 'tunit.log';
        }
        else {
            res = path + '/tunit.log';
        }
        return res;
    }
    getResultNum() {
        return 'Runs:' + (this.successNum + this.failNum + this.errorNum) + '    Successes:' + (this.successNum) + '    Failures:' + this.failNum + '    Errors:' + this.errorNum;
    }
    appendLog() {
        const res = this.getResultNum();
        if (Core.tunit.targetAbsPath) {
            this.logMsgList.push(res);
            this.logMsgList.push('\n\n');
            const path = this.getPath(Core.tunit.targetAbsPath);
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
    }
    next(result, assert) {
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
            const promise = Promise.resolve(result);
            promise.then((value) => {
                this.res = this.gen.next();
                this.res.value = result;
                if (this.res.done) {
                    this.appendLog();
                }
            });
        }
    }
    doSuccess(res, isAssert) {
        console.log('status: [OK]');
        if (isAssert === true) {
            console.log('assert: true');
        }
        this.logResult(res, 3, isAssert);
        this.successNum += 1;
    }
    doFail(res) {
        console.log('status: [FAIL]');
        console.log('assert: false');
        this.logResult(res, 2);
        this.failNum += 1;
    }
    doError(res) {
        console.error('status: [Error]');
        this.logResult(res, 1);
        this.errorNum += 1;
    }
    *generator(testObj) {
        const { beforeClassName, beforeNames, testNames, afterNames, afterClassName } = Core.tunit;
        this.logTime();
        if (beforeClassName) {
            this.println(beforeClassName);
            this.logMethodName(beforeClassName);
            yield testObj[beforeClassName](this.next.bind(this));
        }
        if (testNames.length > 0) {
            for (let test of testNames) {
                if (beforeNames.length > 0) {
                    for (let before of beforeNames) {
                        this.println(before);
                        this.logMethodName(before);
                        yield testObj[before](this.next.bind(this));
                    }
                }
                this.println(test);
                this.logMethodName(test);
                yield testObj[test](this.next.bind(this));
                if (afterNames.length > 0) {
                    for (let after of afterNames) {
                        this.println(after);
                        this.logMethodName(after);
                        yield testObj[after](this.next.bind(this));
                    }
                }
            }
        }
        if (afterClassName) {
            this.println(afterClassName);
            this.logMethodName(afterClassName);
            yield testObj[afterClassName](this.next.bind(this));
        }
    }
    run(testObj) {
        this.targetName = testObj.constructor.name;
        this.gen = this.generator(testObj);
        this.res = this.gen.next();
    }
}
exports.default = Core;