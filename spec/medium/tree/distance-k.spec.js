
import {distanceK} from '../../../src/medium/distance-k';
import {createTreeByLevelTraseval} from '../../../src/utils/binaryTree';

describe('distanceK', () => {
    // const tree = createTreeByLevelTraseval([3,5,1,6,2,0,8,null,null,7,4]);

    // test("distanceK return", () => {
    //     expect(distanceK(tree, tree.left, 2)).toEqual([7,4,1]);
    // });
    // let tree1 = createTreeByLevelTraseval([1]);

    // test("distanceK return", () => {
    //     expect(distanceK(tree1, tree1, 3)).toEqual([]);
    // });
    let tree2 = createTreeByLevelTraseval([0,1,null,3,2]);

    test("distanceK return", () => {
        expect(distanceK(tree2, tree2.left.right, 1)).toEqual([tree2.left]);
    });
});