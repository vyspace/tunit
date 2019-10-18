import Core from './Core';

export default function Before(target:any, propertyKey:string, descriptor:PropertyDescriptor) {
	const tunit = Core.getTUnit();
	tunit.beforeNames.push(propertyKey);
}