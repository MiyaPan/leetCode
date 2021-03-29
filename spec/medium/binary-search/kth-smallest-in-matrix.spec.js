// import { kthSmallest } from '../../../src/middle/binary-search/kth-smallest-in-matrix';
import { kthSmallest } from '../../../src/ms/medium/kthSmallest-InMatrix';

describe('kthSmallest', () => {
    test("return 100", () => {
        expect(kthSmallest([[1,4],[2,5]],2)).toEqual(2);
    });
    // test("return 100", () => {
    //     expect(kthSmallest([[1,5,9],[10,11,13],[12,13,15]],8)).toEqual(13);
    // });
});