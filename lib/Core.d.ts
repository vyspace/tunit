export default class Core {
    private static tunit;
    private gen;
    private res;
    private targetName;
    private logMsgList;
    private successNum;
    private failNum;
    private errorNum;
    constructor();
    static getTUnit(): any;
    private println;
    private logTime;
    private logMethodName;
    private logResult;
    private getPath;
    private getResultNum;
    private appendLog;
    private next;
    private doSuccess;
    private doFail;
    private doError;
    private generator;
    run(testObj: any): void;
}
