import { combinationSum2 } from '../../../src/ms/medium/combinationSum2';

describe('combinationSum2', () => {
    test("701", () => {
        expect(combinationSum2([2,5,2,1,2], 5)).toEqual([[1,2,2],[5]]);
    });
    // test("701", () => {
    //     expect(combinationSum2([10,1,2,7,6,1,5], 8)).toEqual(    [
    //         [1, 7],
    //         [1, 2, 5],
    //         [2, 6],
    //         [1, 1, 6]
    //         ]);
    // });
});