import Core from './Core';

export default function BeforeClass(target:any, propertyKey:string, descriptor:PropertyDescriptor) {
	const tunit = Core.getTUnit();
	tunit.beforeClassName = propertyKey;
}