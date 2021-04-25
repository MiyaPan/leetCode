import { calculate } from '../../../src/ms/medium/calculate';

describe('calculate', () => {
    test("701", () => {
        expect(calculate("1-1+1")).toEqual(1);
    });
    test("701", () => {
        expect(calculate(" 3/2 ")).toEqual(1);
    });
    test("701", () => {
        expect(calculate("3+2*2")).toEqual(7);
    });
});