import {zigzagLevelOrder} from '../../src/middle/zigzag-level-order';
import {createTree} from '../../src/utils/binaryTree';

describe('zigzagLevelOrder', () => {
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

    test("tree return", () => {
        expect(zigzagLevelOrder(tree)).toEqual([[5],[8,2],[1,4,7,9],[6,3,0]]);
    });
});