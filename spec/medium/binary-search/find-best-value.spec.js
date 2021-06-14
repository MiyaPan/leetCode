import { findBestValue } from '../../../src/medium/find-best-value';

describe('findBestValue', () => {
    // test("return 100", () => {
    //     expect(findBestValue([4,9,3], 10)).toEqual(3);
    // });
    // test("return 100", () => {
    //     expect(findBestValue([1547,83230,57084,93444,70879], 71237)).toEqual(17422);
    // });
    // test("return 100", () => {
    //     expect(findBestValue([2,3,5], 11)).toEqual(5);
    // });
    test("return 100", () => {
        expect(findBestValue([2,2], 3)).toEqual(1);
    });
});