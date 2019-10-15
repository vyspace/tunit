export default class TUnitTest {
    init(next: Function): void;
    beforeTesting(next: Function): void;
    afterTesting(next: Function): void;
    testing(next: Function): void;
    end(next: Function): void;
}
