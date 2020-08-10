
import { bstFromPreorder } from '../../src/middle/bst-from-preorder';
import { levelOrder } from '../../../src/easy/level-order-base';

describe('bstFromPreorder', () => {

    test("bstFromPreorder return", () => {
        expect(levelOrder(bstFromPreorder([8,5,1,7,10,12]))).toEqual([8,5,1,7,10,12]);
    });
});