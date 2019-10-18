import Core from './Core';

export default function After(target:any, propertyKey:string, descriptor:PropertyDescriptor) {
	const tunit = Core.getTUnit();
	tunit.afterNames.push(propertyKey);
}