import {createTreeByLevelTraseval} from '../../src/utils/binaryTree';
import { levelOrder } from '../../src/easy/level-order-base';

describe('createTreeByLevelTraseval', () => {
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
    const arr = [1,2,3,4,5,6,7,8,9]
    test("tree return", () => {
        expect(levelOrder(createTreeByLevelTraseval(arr))).toEqual(arr);
    });
});
