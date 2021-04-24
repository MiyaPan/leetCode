import { evalRPN } from '../../../src/ms/medium/evalRPN';

describe('evalRPN', () => {
    test("701", () => {
        expect(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])).toEqual(22);
    });
});