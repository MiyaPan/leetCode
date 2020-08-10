import { findLength } from '../../../src/middle/dp/find-length';

describe('findLength', () => {
    // test("return 100", () => {
    //     expect(findLength([1,2,3,2,1],[3,2,1,4,7])).toEqual(3);
    // });
    test("return 100", () => {
        expect(findLength([0,1,1,1,1],[1,0,1,0,1])).toEqual(2);
    });
});