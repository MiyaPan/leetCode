import { integerBreak } from '../../../src/middle/dp/integer-break';

describe('integerBreak', () => {
    test("return 100", () => {
        expect(integerBreak(10)).toEqual(36);
    });
});