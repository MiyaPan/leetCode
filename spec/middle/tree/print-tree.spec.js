
import {printTree} from '../../src/middle/print-tree';
import {createTreeByLevelTraseval} from '../../../src/utils/binaryTree';

describe('printTree', () => {
    const tree = createTreeByLevelTraseval([1,2]);
    /**
  *     1
       / 
      2   
 */

    test("printTree return", () => {
        expect(printTree(tree)).toEqual([["", "1", ""],["2", "", ""]]);
    });
});