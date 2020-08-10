import { kthSmallest } from '../../../src/middle/binary-search/kth-smallest-in-matrix';

describe('kthSmallest', () => {
    test("return 100", () => {
        expect(kthSmallest([[1,5,9],[10,11,13],[12,13,15]],8)).toEqual(13);
    });
});