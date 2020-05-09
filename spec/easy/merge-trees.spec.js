import {mergeTrees} from '../../src/easy/merge-trees';
import { levelOrder } from '../../src/easy/level-order-base';

describe('mergeTrees', () => {
        /**
    输入: 
        Tree 1                     Tree 2                  
             1                         2                             
            / \                       / \                            
           3   2                     1   3                        
          /                           \   \                      
         5                             4   7                  
    输出: 
             3
            / \
           4   5
          / \   \ 
         5   4   7
*/
    const tree1 = {
        val: 1,
        left: {
            val: 3,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right: null
        },
        right: {
            val: 2,
            left: null,
            right: null
        }
    };

    const tree2 = {
        val: 2,
        left: {
            val: 1,
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
            right: {
                val: 7,
                left: null,
                right: null
            }
        }
    };

    /**
     *       3
            / \
           4   5
          / \   \ 
         5   4   7
    */
    const tree = {
        val: 3,
        left: {
            val: 4,
            left: {
                val: 5,
                left: null,
                right: null
            },
            right: {
                val: 4,
                left: null,
                right: null
            }
        },
        right: {
            val: 5,
            left: null,
            right: {
                val: 7,
                left: null,
                right: null
            }
        }
    };
    test("tree return", () => {
        expect(levelOrder(mergeTrees(tree1, tree2))).toEqual([3,4,5,5,4,7]);
    });
});
