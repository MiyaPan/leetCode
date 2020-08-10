
import {numFactoredBinaryTrees} from '../../src/middle/num-factored-binary-trees';

describe('numFactoredBinaryTrees', () => {
    // test("numFactoredBinaryTrees return", () => {
    //     expect(numFactoredBinaryTrees([2, 4])).toEqual(3);
    // });

    // test("numFactoredBinaryTrees return", () => {
    //     expect(numFactoredBinaryTrees([2,4,5,10])).toEqual(7);
    // });

    test("numFactoredBinaryTrees return", () => {
        expect(numFactoredBinaryTrees([18,3,6,2])).toEqual(12);
    });
});