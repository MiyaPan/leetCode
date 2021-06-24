import {flatten} from '../../../src/medium/flatten';
import {levelOrder} from '../../../src/easy/tree/level-order-base';

describe('flatten', () => {
    const tree = {
        val: 1,
        left: {
            val: 2,
            left: {
                val: 3,
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
                val: 6,
                left: null,
                right: null
            }
        }
    };
    /**
  *     1
       / \
      2   5
     / \   \
    3   4   6
 */
    const tree1 = {
        val: 1,
        left: null,
        right: {
            val: 2,
            left: null,
            right: {
                val: 3,
                left: null,
                right: {
                    val: 4,
                    left: null,
                    right: {
                        val: 5,
                        left: null,
                        right: {
                            val: 6,
                            left: null,
                            right: null
                        }   
                    }
                }
            }
        }
    };
    test("tree return", () => {
        flatten(tree);
        expect(levelOrder(tree)).toEqual([1,2,3,4,5,6]);
    });
});
