import { findNumberOfLIS } from '../../../src/middle/dp/find-number-of-LIS';

describe('findNumberOfLIS', () => {
    // test("return 100", () => {
    //     expect(findNumberOfLIS([1,2,4,3,5,4,7,2])).toEqual(2);
    // });
    // test("return 100", () => {
    //     expect(findNumberOfLIS([1,2,3,1,2,3,1,2,3])).toEqual(10);
    // });
    // test("return 100", () => {
    //     expect(findNumberOfLIS([1,3,5,4,7])).toEqual(2);
    // });
    test("return 100", () => {
        expect(findNumberOfLIS([1,1,1,2,2,2,3,3,3])).toEqual(27);
    });
});