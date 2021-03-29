import { kthSmallest3 } from '../../../src/ms/medium/kthSmallest-InMatrix';

describe('kthSmallest3', () => {
    test("return 13", () => {
        expect(kthSmallest3([[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], 5)).toEqual(5);
    });
    // test("return 13", () => {
    //     expect(kthSmallest3([[1,2],[1,3]], 2)).toEqual(1);
    // });
    // test("return 13", () => {
    //     expect(kthSmallest3([[1,5,9],[10,11,13],[12,13,15]], 8)).toEqual(13);
    // });
});