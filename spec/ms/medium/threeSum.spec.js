import { threeSum } from '../../../src/ms/medium/threeSum';

describe('threeSum', () => {
    // test("[-1,0,1,2,-1,-4]", () => {
    //     expect(threeSum([-1,0,1,2,-1,-4])).toEqual([[-1,-1,2],[-1,0,1]]);
    // });
    test("[0,0,0]", () => {
        expect(threeSum([0,0,0])).toEqual([[0,0,0]]);
    });
});