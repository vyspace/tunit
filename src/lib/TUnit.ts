import Core from './Core';

export default function TUnit(absPath?:string) {
	if(!absPath) {
		absPath = ''
	}
	return (target:any):void => {
		const tunit = Core.getTUnit(),
			obj = new target();
		tunit.targetAbsPath = absPath;
		const core = new Core();
		core.run(obj);
	}
}