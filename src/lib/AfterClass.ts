import Core from './Core';

export default function AfterClass(target:any, propertyKey:string, descriptor:PropertyDescriptor) {
	const tunit = Core.getTUnit();
	tunit.afterClassName = propertyKey;
}