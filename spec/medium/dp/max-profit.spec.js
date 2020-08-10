import { maxProfit } from '../../../src/middle/dp/max-profit';

describe('maxProfit', () => {
    test("return 3", () => {
        expect(maxProfit([1,2,3,0,2])).toEqual(3);
    });
});