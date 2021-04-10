// import { coinChange } from '../../../src/middle/dp/coin-change';
import { coinChange } from '../../../src/ms/medium/coinChange';

describe('coinChange', () => {
    test("return 100", () => {
        expect(coinChange([1,2,5], 11)).toEqual(3);
    });
});