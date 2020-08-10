import { nthUglyNumber } from '../../../src/middle/binary-search/nth-ugly-number';

describe('nthUglyNumber', () => {
    // test("return 100", () => {
    //     expect(nthUglyNumber(4,2,3,4)).toEqual(6);
    // });
    test("return 100", () => {
        expect(nthUglyNumber(3,2,3,5)).toEqual(4);
    });
});