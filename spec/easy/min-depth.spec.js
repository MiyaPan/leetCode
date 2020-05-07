import {createTree} from '../../src/utils/binaryTree';
import { minDepth } from '../../src/easy/min-depth';

describe('minDepth', () => {
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

    test("tree return 4", () => {
        expect(minDepth(tree)).toEqual(3);
    });

    const tree1 = {
        val: 1,
        left: {
            val: 2,
            left: null,
            right: null
        },
        right: null
    };
    test("tree1 return 2", () => {
        expect(minDepth(tree1)).toEqual(2);
    });
});

// describe('minDepthDFS', () => {
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

//     test("tree return 4", () => {
//         expect(minDepthDFS(tree)).toEqual(4);
//     });

//     /**
//         3
//        / \
//       9  20
//         /  \
//        15   7
//     */
//    const tree1 = {
//        val: 3,
//        left: {
//            val: 9,
//            left: null,
//            right: null
//        },
//        right: {
//             val: 20,
//             left: {
//                 val: 15,
//                 left: null,
//                 right: null
//             },
//             right: {
//                 val: 7,
//                 left: null,
//                 right: null
//             }
//         }
//    };
//     test("tree return 4", () => {
//         expect(minDepthDFS(tree1)).toEqual(3);
//     });
// });