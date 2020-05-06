import { isBalanced } from '../../src/easy/is-balanced-tree';

describe('isBalanced', () => {
    const tree = {
        val: 3,
        left: {
            val: 9,
            left: null,
            right: null
        },
        right: {
             val: 20,
             left: {
                 val: 15,
                 left: null,
                 right: null
             },
             right: {
                 val: 7,
                 left: null,
                 right: null
             }
         }
    };

    /**
        3
       / \
      9  20
        /  \
       15   7
    */

    // test("tree return true", () => {
    //     expect(isBalanced(tree)).toEqual(true);
    // });

    const tree1 = {
        val: 3,
        left: {
            val: 9,
            left: null,
            right: null
        },
        right: {
             val: 20,
             left: {
                 val: 15,
                 left: {
                    val: 4,
                    left: null,
                    right: null
                 },
                 right: null
             },
             right: {
                 val: 7,
                 left: null,
                 right: null
             }
         }
    };

    /**
        3
       / \
      9  20
        /  \
       15   7
      /
     4
    */

    // test("tree return true", () => {
    //     expect(isBalanced(tree1)).toEqual(false);
    // });

    const tree2 = {
        val: 3,
        left: {
            val: 9,
            left: {
                val: 8,
                left:  {
                    val: 7,
                    left: null,
                    right: null
                },
                right: null
            },
            right: null
        },
        right: {
             val: 20,
             left: null,
             right: {
                 val: 7,
                 left: null,
                 right: {
                    val: 6,
                    left: null,
                    right: null
                }
             }
         }
    };

    /**
        3
       / \
      9  20
        /  \
       15   7
      /
     4
    */

    test("tree return true", () => {
        expect(isBalanced(tree2)).toEqual(false);
    });
});