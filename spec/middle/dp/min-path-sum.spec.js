import { minPathSum2 } from '../../../src/middle/dp/min-path-sum';

describe('minPathSum2', () => {
    test("return 100", () => {
        expect(minPathSum2([[1,3,1],[1,5,1],[4,2,1]])).toEqual(7);
    });
});