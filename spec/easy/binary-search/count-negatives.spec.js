import { countNegatives } from '../../../src/easy/binary-search/count-negatives';

describe('countNegatives', () => {
    test("11, 1 return 100", () => {
        expect(countNegatives([[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]])).toEqual(8);
    });
});