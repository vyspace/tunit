import Core from './Core';

export default function Test(target:any, propertyKey:string, descriptor:PropertyDescriptor) {
	const tunit = Core.getTUnit();
	tunit.testNames.push(propertyKey);
}