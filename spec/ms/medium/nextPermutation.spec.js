import { nextPermutation } from '../../../src/ms/medium/nextPermutation';

describe('nextPermutation', () => {
    test("nextPermutation", () => {
        // 13,10,1,20
        expect(nextPermutation([1,20,13,10])).toEqual([10,1,13,20]);
    });
    // test("nextPermutation", () => {
    //     expect(nextPermutation([1,2,3])).toEqual([1,3,2]);
    // });
});