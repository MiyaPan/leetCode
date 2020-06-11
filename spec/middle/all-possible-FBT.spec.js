
import {allPossibleFBT} from '../../src/middle/all-possible-FBT';
import {levelOrder} from '../../src/easy/level-order-base';

describe('allPossibleFBT', () => {
    test("allPossibleFBT return", () => {
        expect(allPossibleFBT(7).map(tree => levelOrder(tree))).toEqual([[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]);
    });
});