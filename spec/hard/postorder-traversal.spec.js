
import {postorderTraversal, postorderTraversalIterative} from '../../src/hard/postorder-traversal';
import {createTree} from '../../src/utils/binaryTree';

describe('postorderTraversal', () => {
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

    test("postorderTraversal return", () => {
        expect(postorderTraversal(tree)).toEqual([0,1,3,4,2,6,7,9,8,5]);
    });
});

describe('postorderTraversalIterative', () => {
    const arr = [0,1,2,3,4,5,6,7,8,9];
    const tree = createTree(arr, 0, 10);

    test("postorderTraversalIterative return", () => {
        expect(postorderTraversalIterative(tree)).toEqual([0,1,3,4,2,6,7,9,8,5]);
    });

    const tree1 = {
        val: 1,
        left: null,
        right: {
             val: 2,
             left: {
                val: 3,
                left: null,
                right: null
            },
             right: null
         }
    };

    test("postorderTraversalIterative return", () => {
        expect(postorderTraversalIterative(tree1)).toEqual([3,2,1]);
    });
});
