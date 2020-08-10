
import {preorderTraversal, preorderTraversalIterative} from '../../src/middle/preorder-traversal';
import {createTree} from '../../../src/utils/binaryTree';

describe('preorderTraversal', () => {
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

    test("preorderTraversal return", () => {
        expect(preorderTraversal(tree)).toEqual([5,2,1,0,4,3,8,7,6,9]);
    });
});

describe('preorderTraversalIterative', () => {
    const arr = [0,1,2,3,4,5,6,7,8,9];
    const tree = createTree(arr, 0, 10);

    test("preorderTraversalIterative return", () => {
        expect(preorderTraversalIterative(tree)).toEqual([5,2,1,0,4,3,8,7,6,9]);
    });
});

// describe('preorderTraversalNotRecursive1', () => {
//     const arr = [0,1,2,3,4,5,6,7,8,9];
//     const tree = createTree(arr, 0, 10);

//     test("preorderTraversalNotRecursive1 return", () => {
//         expect(preorderTraversalNotRecursive1(tree)).toEqual([0,1,2,3,4,5,6,7,8,9]);
//     });
// });