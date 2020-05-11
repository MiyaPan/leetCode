import {binaryTreePaths} from '../../src/easy/binary-tree-paths';

describe('binaryTreePaths', () => {
    const tree = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 4,
                left: null,
                right: null
            },
            right: null
        },
        right: {
            val: 3,
            left: null,
            right: null
        }
    };
    /**
  *     1
       / \
      2   3
     /
    4
 */
    test("tree return", () => {
        expect(binaryTreePaths(tree)).toEqual(['1->2->4', '1->3']);
    });

    const tree1 = {
        val: 1,
        left: {
            val: 2,
            left: null,
            right: {
                val: 4,
                left: null,
                right: null
            }
        },
        right: {
            val: 3,
            left: null,
            right: null
        }
    };
    /**
  *     1
       / \
      2   3
       \   
        4   
 */
    test("tree return", () => {
        expect(binaryTreePaths(tree1)).toEqual(['1->2->4', '1->3']);
    });
});
