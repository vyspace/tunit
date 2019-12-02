import fs from 'fs';

export default class Core {
	private static tunit:any;
	private gen:any;
	private res:any;
	private targetName:string;
	private logMsgList:Array<string>;
	private successNum:number;
	private failNum:number;
	private errorNum:number;
	constructor() {
		this.gen = null;
		this.res = null;
		this.targetName = '';
		this.logMsgList = [];
		this.successNum = 0;
		this.failNum = 0;
		this.errorNum = 0;
	}
	static getTUnit():any {
		if(!Core.tunit) {
			Core.tunit = Object.seal({
				targetAbsPath: '',
				beforeClassName:'',
				beforeNames:[],
				testNames:[],
				afterNames:[],
				afterClassName:''
			});
		}
		return Core.tunit;
	}
	private println(methodName:string) {
		let star = '---';
		console.log(star+' '+this.targetName+'.'+methodName+' '+star);
	}
	private logTime() {
		if(Core.tunit.targetAbsPath) {
			const first = '/////////////////////////////////',
				second = '//                             //',
				timeStr = new Date().toLocaleString(),
				middle = '//   '+timeStr+'   //';
			this.logMsgList.push(first);
			this.logMsgList.push(second);
			this.logMsgList.push(middle);
			this.logMsgList.push(second);
			this.logMsgList.push(first);
		}
	}
	private logMethodName(methodName:string) {
		if(Core.tunit.targetAbsPath) {
			let star = '----'
			this.logMsgList.push(star+' '+this.targetName+'.'+methodName+' '+star);
		}
	}
	private logResult(res:any, type:number, isAssert?:boolean) {
		if(Core.tunit.targetAbsPath) {
			if(res===undefined||res===null) {
				res = '';
			}
			if(type === 1) {
				this.logMsgList.push('status: [Error]');
				this.logMsgList.push('error: '+JSON.stringify(res.stack.split('\n'), null, 2));
			}
			else if(type === 2) {
				let r:any;
				this.logMsgList.push('status: [FAIL]');
				this.logMsgList.push('assert: false');
				if(typeof(res) == 'object' && res.stack) {
					r = res.stack.split('\n');
				}
				else {
					r = res;
				}
				this.logMsgList.push('error: '+JSON.stringify(r, null, 2));
			}
			else {
				this.logMsgList.push('status: [OK]');
				if(isAssert===true) this.logMsgList.push('assert: true');
				this.logMsgList.push('result: '+JSON.stringify(res, null, 2));
			}
		}
	}
	private getPath(path:string) {
		let res = '';
		if(/[//]$/.test(path)){
			res = path + 'tunit.log';
		}
		else {
			res = path + '/tunit.log';
		}
		return res;
	}
	private getResultNum() {
		return 'Runs:'+(this.successNum+this.failNum+this.errorNum)+'    Successes:'+(this.successNum)+'    Failures:'+this.failNum+'    Errors:'+this.errorNum;
	}
	private appendLog() {
		const t = this,
			res =t.getResultNum();
		let wData = null;
		if(Core.tunit.targetAbsPath) {
			t.logMsgList.push(res);
			t.logMsgList.push('\n\n');
			const path = this.getPath(Core.tunit.targetAbsPath);
			fs.readFile(path, {encoding:'utf-8', flag:'a+'}, function (err, data) {
			    if(err) {
			        console.error(err);
			    } 
			    else {
					const wData = t.logMsgList.join('\n') + data
			        fs.writeFile(path, wData, (err) => {
					  if(err) {
					  	 console.error(err);
					  }
					  console.log('The log file name is '+'tunit.log');
					});
			    }
			});
		}
		else {
			console.log(res);
		}
	}
	private next(result?:any, assert?:any) {
		if (!this.res || this.res&&!this.res.done) {
			if(assert === true) {
				this.doSuccess(result, true);
			}
			else if(assert === false) {
				this.doFail(result);
			}
			else {
				if(typeof(result)==='object'&&result instanceof Error) {
					if(result.name === 'AssertionError') {
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
            promise.then((value:any) => {
				this.res = this.gen.next();
				this.res.value = result;
				if(this.res.done) {
					this.appendLog();
				}
			});
        }
	}
	private doSuccess(res:any, isAssert?:any) {
		console.log('status: [OK]');
		if(isAssert === true) {
			console.log('assert: true');
		}
		this.logResult(res, 3, isAssert);
		this.successNum += 1;
	}
	private doFail(res:any) {
		console.log('status: [FAIL]');
		console.log('assert: false');
		this.logResult(res, 2);
		this.failNum += 1;
	}
	private doError(res:any) {
		console.error('status: [Error]');
		this.logResult(res, 1);
		this.errorNum += 1;
	}
	private *generator(testObj:any):IterableIterator<any> {
		const { beforeClassName,beforeNames,testNames,afterNames,afterClassName } = Core.tunit;
		this.logTime();
		if(beforeClassName) {
			this.println(beforeClassName);
			this.logMethodName(beforeClassName);
			yield testObj[beforeClassName](this.next.bind(this))
		}
		if(testNames.length > 0) {
			for(let test of testNames) {
				if(beforeNames.length > 0) {
					for(let before of beforeNames) {
						this.println(before);
						this.logMethodName(before);
						yield testObj[before](this.next.bind(this));
					}
				}
				this.println(test);
				this.logMethodName(test);
				yield testObj[test](this.next.bind(this));
				if(afterNames.length > 0) {
					for(let after of afterNames) {
						this.println(after);
						this.logMethodName(after);
						yield testObj[after](this.next.bind(this));
					}
				}
			}
		}
		if(afterClassName) {
			this.println(afterClassName);
			this.logMethodName(afterClassName);
			yield testObj[afterClassName](this.next.bind(this));
		}
	}
	run(testObj:any) {
		this.targetName = testObj.constructor.name;
	    this.gen = this.generator(testObj);
	    this.res = this.gen.next();
	}
}