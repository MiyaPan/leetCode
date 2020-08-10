import { nthUglyNumber } from '../../../src/middle/dp/nth-ugly-number';

describe('nthUglyNumber', () => {
    test("return 12", () => {
        expect(nthUglyNumber(10)).toEqual(12);
    }); 
});