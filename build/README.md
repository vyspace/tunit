Welcome to TUnit!
===

This a unit test plugin on the node.js, if you used junit before, you'll learn it soon..
TUnit is used in typescript projects so that coding with annotation.

----------


### Table of contents
- [Install](#install)
- [Example](#example)
- [Annotations](#annotations)
- [Assertion Methods](#assert-method)

-------------
### Install

```javascript
npm install tunit --save-dev
```

### Example

##### The following code uses typescript

- First of all, you'd better create a entity class **TheTest.ts** 

	> The file name can't named "Test". 

	> It is recommended to use try commands pack exec statment to catch error so that to prevent execution interruption.
```javascript
import { BeforeClass,Before,Test,After,AfterClass,TUnit,Assert } from 'tunit';

@TUnit() 
export default class TUnitTest {
	@BeforeClass
	init(next:Function):void {
		setTimeout(():void=>{
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
```
 - The whole process of the test is a generator function, so the method **next** is important in asynchronous threads, which is the key to whether the whole test can run smoothly. This function takes two arguments, the result of the run and the return value after the assertion

```javascript
next(result?:any, assert?:any):void
```


- Finally, to run this file.

```javascript
ts-node ./TheTest.ts
```


### Annotations

|  Annotation       | Description  |
| ------------- |:-------------|
|@BeforeClass|It to be run once before any of the test methods in the class.|
|@Before|Annotating a public void method with @Before causes that method to be run before the Test method.|
|@Test|Annotating a public void method with @Test causes that method to be run the Test method.|
|@After|Annotating a public void method with @After causes that method to be run after the Test method.|
|@AfterClass|It to be run once after any of the test methods in the class.|
|@TUnit(params)|It is important. This annotation tell tunit plugin to run the Test class. It has a parameter that log file path if you want to get operational processes. The log file include running result, test status, error message and so on.|

### Assertion Methods

- All methods are static. If testing is successful, return true otherwise throw AssertionError.

|  Methods    | Description  |
| ------------- |:-------------|
|fail(msg?: string):void|Throw an AssertionError.|
|assertNull(obj: any, msg?: string):boolean|Assert the argument is null.|
|assertNotNull(obj: any, msg?: string):boolean|Assert the argument is not null.|
|assertUndefined(obj: any, msg?: string):boolean|Assert the argument is undefied.|
|assertNotUndefined(obj: any, msg?: string):boolean|Assert the argument is not undefied.|
|assertNullOrUndefined(obj: any, msg?: string):boolean|Assert the argument is null or undefied.|
|assertNotNullAndUndefined(obj: any, msg?: string): boolean|Assert the argument neither null nor undefied.|
|assertSame(expected: any, actual: any, msg?: string): boolean|That's equal to '=='|
|assertNotSame(expected: any, actual: any, msg?: string): boolean|That's equal to '!='|
|assertEquals(expected: any, actual: any, msg?: string): boolean|That's equal to '==='|
|assertNotEquals(expected: any, actual: any, msg?: string): boolean|That's equal to '!=='|
|assertTrue(condition: boolean, msg?: string): boolean|Assert the argument is true|
|assertFalse(condition: boolean, msg?: string): boolean|Assert the argument is false|

#### More specifications,  in the building...

<br/>
<br/>


[![NPM](https://nodei.co/npm/tunit.png)](https://nodei.co/npm/tunit/)
