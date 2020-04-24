import {createTree} from '../../src/utils/binaryTree';
import { levelOrderBottom, levelOrderBottom2 } from '../../src/easy/level-order-bottom';

describe('levelOrderBottom', () => {
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
        expect(levelOrderBottom(tree)).toEqual([[0,3,6],[1,4,7,9],[2,8],[5]]);
    });
});

describe('levelOrderBottom2', () => {
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
        expect(levelOrderBottom2(tree)).toEqual([[0,3,6],[1,4,7,9],[2,8],[5]]);
    });
});


