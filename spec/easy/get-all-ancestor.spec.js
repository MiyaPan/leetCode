import {createTree} from '../../src/utils/binaryTree';
import { getAllAncestor } from '../../src/easy/get-all-ancestor';

describe('getAllAncestor', () => {
    const arr = [0,1,2,3,4,5,6,7,8,9];
    const tree = createTree(arr, 0, 10);

    /**
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3     6
    */

    test("tree return [4,2,5]", () => {
        expect(getAllAncestor(tree, tree.left.right.left).toString()).toEqual([4,2,5].toString());
    });
});
