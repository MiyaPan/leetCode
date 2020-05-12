import {isUnivalTree} from '../../src/easy/is-unival-tree';
import {createTreeByLevelTraseval} from '../../src/utils/binaryTree';

describe('isUnivalTree', () => {
    const tree = createTreeByLevelTraseval([1,2,3,4]);
    /**
  *     1
       / \
      2   3
     /
    4
 */
    // test("tree return", () => {
    //     expect(isUnivalTree(tree)).toEqual(false);
    // });

    const arr = [4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2];
    const tree1 = createTreeByLevelTraseval(arr);
    // test("tree1 return", () => {
    //     expect(isUnivalTree(tree1)).toEqual(false);
    // });

    const tree2 = createTreeByLevelTraseval([1,1,1,null,1]);
    test("tree2 return", () => {
        expect(isUnivalTree(tree2)).toEqual(true);
    });
});
