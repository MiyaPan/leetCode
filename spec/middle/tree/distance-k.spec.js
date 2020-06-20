
import {distanceK} from '../../src/middle/distance-k';
import {createTreeByLevelTraseval} from '../../../src/utils/binaryTree';

describe('distanceK', () => {
    const tree = createTreeByLevelTraseval([3,5,1,6,2,0,8,null,null,7,4]);

    test("distanceK return", () => {
        expect(distanceK(tree, tree.left, 2)).toEqual([7,4,1]);
    });
});