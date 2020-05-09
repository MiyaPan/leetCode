import {findTilt} from '../../src/easy/find-tilt';

describe('findTilt', () => {
    const tree = {
        val: 1,
        left: {
            val: 2,
            left: null,
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
 */
    test("tree return", () => {
        expect(findTilt(tree)).toEqual(1);
    });

    const tree1 = {
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
    test("tree return", () => {
        expect(findTilt(tree1)).toEqual(9);
    });
});
