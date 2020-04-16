import { merge } from '../../src/easy/merge-two-ordered-array';

describe('merge', () => {
    test("[1,2,3,0,0,0], [2,5,6] return  [1,2,2,3,5,6]", () => {
        expect(merge([1,2,3,0,0,0], 3, [2,5,6], 3)).toEqual( [1,2,2,3,5,6]);
    });

    test("[0], [1] return  [1]", () => {
        expect(merge([0], 0, [1], 1)).toEqual([1]);
    });

    test("[2,0], [1] return  [1, 2]", () => {
        expect(merge([2, 0], 1, [1], 1)).toEqual([1, 2]);
    });

    test("[4,5,6,0,0,0], [1,2,3] return  [1,2,3,4,5,6]", () => {
        expect(merge([4,5,6], 3, [1,2,3], 3)).toEqual([1,2,3,4,5,6]);
    });
});
