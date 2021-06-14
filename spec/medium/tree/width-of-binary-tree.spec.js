
import {widthOfBinaryTree} from '../../../src/medium/width-of-binary-tree';
import {createTreeByLevelTraseval} from '../../../src/utils/binaryTree';

describe('widthOfBinaryTree', () => {
    const tree = createTreeByLevelTraseval([1,3,2,5,3,null,9]);
    /**
  *     1
       / 
      2   
 */

    test("widthOfBinaryTree return", () => {
        expect(widthOfBinaryTree(tree)).toEqual(4);
    });

    // const tree1 = createTreeByLevelTraseval([1,1,1,1,1,1,1,null,null,null,1,null,null,null,null,2,2,2,2,2,2,2,null,2,null,null,2,null,2]);
    // test("widthOfBinaryTree return", () => {
    //     expect(widthOfBinaryTree(tree1)).toEqual(8);
    // });
    const tree2 = createTreeByLevelTraseval([0,0,0,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null,null,0,0,null]);
    test("widthOfBinaryTree return", () => {
        expect(widthOfBinaryTree(tree2)).toEqual(2);
    });
});