import { coinChange } from '../../../src/middle/dp/coin-change';

describe('coinChange', () => {
    test("return 100", () => {
        expect(coinChange([1,2,5], 11)).toEqual(3);
    });
});