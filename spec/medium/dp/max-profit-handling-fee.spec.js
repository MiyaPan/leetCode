import { maxProfit } from '../../../src/middle/dp/max-profit-handling-fee';

describe('maxProfit', () => {
    test("return 100", () => {
        expect(maxProfit([1,3,2,8,4,9], 2)).toEqual(8);
    });
});