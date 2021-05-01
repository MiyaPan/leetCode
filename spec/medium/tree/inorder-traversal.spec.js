
// import {inorderTraversal, inorderTraversalNotRecursive, inorderTraversalNotRecursive1} from '../../src/middle/inorder-traversal';
import {inorderTraversal} from '../../../src/ms/medium/inorderTraversal';
import {createTree} from '../../../src/utils/binaryTree';

describe('inorderTraversal', () => {
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

    test("inorderTraversal return", () => {
        expect(inorderTraversal(tree)).toEqual([0,1,2,3,4,5,6,7,8,9]);
    });
});

// describe('inorderTraversalNotRecursive', () => {
//     const arr = [0,1,2,3,4,5,6,7,8,9];
//     const tree = createTree(arr, 0, 10);

//     /**
//      *            5
//      *        /        \
//      *       2          8
//      *     /   \       / \
//      *    1     4     7   9
//      *   /     /     /
//      *  0     3     6
//     */

//     test("inorderTraversalNotRecursive return", () => {
//         expect(inorderTraversalNotRecursive(tree)).toEqual([0,1,2,3,4,5,6,7,8,9]);
//     });
// });

// describe('inorderTraversalNotRecursive1', () => {
//     const arr = [0,1,2,3,4,5,6,7,8,9];
//     const tree = createTree(arr, 0, 10);

//     /**
//      *            5
//      *        /        \
//      *       2          8
//      *     /   \       / \
//      *    1     4     7   9
//      *   /     /     /
//      *  0     3     6
//     */

//     test("inorderTraversalNotRecursive1 return", () => {
//         expect(inorderTraversalNotRecursive1(tree)).toEqual([0,1,2,3,4,5,6,7,8,9]);
//     });
// });