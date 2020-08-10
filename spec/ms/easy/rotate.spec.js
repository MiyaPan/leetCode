import { rotate } from '../../../src/ms/easy/rotate';

describe('rotate', () => {
    // test("[-1,-100,3,99] 2", () => {
    //     expect(rotate([-1,-100,3,99], 2)).toEqual([3,99,-1,-100]);
    // });
    // test("[1] 1", () => {
    //     expect(rotate([1], 1)).toEqual([1]);
    // });
    // test("[1,2,3,4,5,6],3", () => {
    //     expect(rotate([1,2,3,4,5,6],3)).toEqual([4,5,6,1,2,3]);
    // });
    test("[1,2,3,4,5,6],2", () => {
        expect(rotate([1,2,3,4,5,6],2)).toEqual([5,6,1,2,3,4]);
    });
});