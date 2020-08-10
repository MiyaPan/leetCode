import { minDays } from '../../../src/middle/binary-search/min-days';

describe('minDays', () => {
    // test("return 100", () => {
    //     expect(minDays([7,7,7,7,12,7,7], 2,3)).toEqual(12);
    // });
    // test("return 100", () => {
    //     expect(minDays([1,10,3,10,2], 3, 1)).toEqual(3);
    // });
    test("return 100", () => {
        expect(minDays([1,10,2,9,3,8,4,7,5,6], 4, 2)).toEqual(9);
    });
});