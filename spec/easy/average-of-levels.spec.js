import {averageOfLevels} from '../../src/easy/average-of-levels';

describe('averageOfLevels', () => {
    /**
     *       3
            / \
           9   20
              /  \ 
             15   7
    */
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
    test("tree return", () => {
        expect(averageOfLevels(tree)).toEqual([3, 14.5, 11]);
    });
});
