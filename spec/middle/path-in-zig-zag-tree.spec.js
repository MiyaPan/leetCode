
import {pathInZigZagTree} from '../../src/middle/path-in-zig-zag-tree';
import {createTreeByLevelTraseval} from '../../src/utils/binaryTree';

describe('pathInZigZagTree', () => {
    const tree = createTreeByLevelTraseval([1,2]);

    test("pathInZigZagTree return", () => {
        expect(pathInZigZagTree(14)).toEqual([1,3,4,14]);
    });
});