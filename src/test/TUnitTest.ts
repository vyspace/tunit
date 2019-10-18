import { BeforeClass,Before,Test,After,AfterClass,TUnit,Assert } from '../index';

@TUnit() //TUnit has a parameter, the type is string. It's a absolute path of the log file.
export default class TUnitTest {
	@BeforeClass
	init(next:Function):void {
		setTimeout(function(){
			try {
				console.log('This is BeforeClass Method');
				next();
			}
			catch(err) {
				next(err);
			}
		}, 2000);	
	}
	@Before
	beforeTesting(next:Function) {
		console.log('This is Before Method');
		try {
			const assert = Assert.assertNotNull(null, 'This is a null result');
			next(null, assert);
		}
		catch(err) {
			next(err);
		}
	}
	@After
	afterTesting(next:Function) {
		console.log('This is After Method');
		try {
			throw new Error('This is a error mssages')
			next();
		}
		catch(err) {
			next(err);
		}
	}
	@Test
	testing(next:Function) {
		console.log('This is Test Method');
		setTimeout(function() {
			console.log('Test Method is executing after 1 sec');
			next('testing');
		}, 1000);
	}
	@AfterClass
	end(next:Function) {
		console.log('This is AfterClass Method');
		next()
	}
}