import {diameterOfBinaryTree} from '../../src/easy/diameter-of-binary-tree';
import {createTreeByLevelTraseval} from '../../src/utils/binaryTree';

describe('diameterOfBinaryTree', () => {
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
        expect(diameterOfBinaryTree(tree)).toEqual(3);
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
    test("tree2 return", () => {
        expect(diameterOfBinaryTree(tree1)).toEqual(3);
    });

    const arr = [4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2];
    const tree3 = createTreeByLevelTraseval(arr);
    test("tree3 return", () => {
        expect(diameterOfBinaryTree(tree3)).toEqual(8);
    });
});
