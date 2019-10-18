export default class Assert {
    constructor();
    static fail(msg?: string): void;
    static assertNull(obj: any, msg?: string): boolean | undefined;
    static assertNotNull(obj: any, msg?: string): boolean | undefined;
    static assertUndefined(obj: any, msg?: string): boolean | undefined;
    static assertNotUndefined(obj: any, msg?: string): boolean | undefined;
    static assertNullOrUndefined(obj: any, msg?: string): boolean | undefined;
    static assertNotNullAndUndefined(obj: any, msg?: string): boolean | undefined;
    static assertSame(expected: any, actual: any, msg?: string): boolean | undefined;
    static assertNotSame(expected: any, actual: any, msg?: string): boolean | undefined;
    static assertEquals(expected: any, actual: any, msg?: string): boolean | undefined;
    static assertNotEquals(expected: any, actual: any, msg?: string): boolean | undefined;
    static assertTrue(condition: boolean, msg?: string): boolean | undefined;
    static assertFalse(condition: boolean, msg?: string): boolean | undefined;
}
