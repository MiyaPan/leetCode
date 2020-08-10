import { shipWithinDays } from '../../../src/middle/binary-search/ship-within-days';

describe('shipWithinDays', () => {
    test("return 100", () => {
        expect(shipWithinDays([1,2,3,4,5,6,7,8,9,10],5)).toEqual(15);
    });
});