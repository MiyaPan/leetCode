import { findClosestElements } from '../../../src/middle/binary-search/find-closest-elements';

describe('findClosestElements', () => {
    // test("return 100", () => {
    //     expect(findClosestElements([1,2,3,4,5],4,3)).toEqual([1,2,3,4]);
    // });
    // test("return 100", () => {
    //     expect(findClosestElements([1],1,1)).toEqual([1]);
    // });
    test("return 100", () => {
        expect(findClosestElements([1,1,1,10,10,10],1,9)).toEqual([10]);
    });
});