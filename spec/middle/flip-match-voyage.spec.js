
import {flipMatchVoyage, flipMatchVoyage1} from '../../src/middle/flip-match-voyage';
import {createTreeByLevelTraseval} from '../../src/utils/binaryTree';

describe('flipMatchVoyage', () => {
    const tree = createTreeByLevelTraseval([1,2,3]);

    test("flipMatchVoyage return", () => {
        expect(flipMatchVoyage(tree, [1,3,2])).toEqual([1]);
    });
});

describe('flipMatchVoyage1', () => {
    const tree = createTreeByLevelTraseval([1,2,3]);

    test("flipMatchVoyage return", () => {
        expect(flipMatchVoyage1(tree, [1,3,2])).toEqual([1]);
    });
});