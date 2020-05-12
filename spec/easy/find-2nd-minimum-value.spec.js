import {findSecondMinimumValue} from '../../src/easy/find-2nd-minimum-value';
import {createTreeByLevelTraseval} from '../../src/utils/binaryTree';

describe('findSecondMinimumValue', () => {
    const tree = createTreeByLevelTraseval([1,2,3,4]);
    /**
  *     1
       / \
      2   3
     /
    4
 */
    test("tree return", () => {
        expect(findSecondMinimumValue(tree)).toEqual(2);
    });

    const arr = [4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2];
    const tree1 = createTreeByLevelTraseval(arr);
    test("tree1 return", () => {
        expect(findSecondMinimumValue(tree1)).toEqual(-7);
    });
});
