import { maxSideLength } from '../../../src/middle/binary-search/max-side-length';

describe('maxSideLength', () => {
    test("return 100", () => {
        expect(maxSideLength([[1,1,3,2,4,3,2],[1,1,3,2,4,3,2],[1,1,3,2,4,3,2]], 4)).toEqual(2);
    });
});