
import {verticalTraversal} from '../../src/middle/vertical-traversal';
import {createTreeByLevelTraseval} from '../../../src/utils/binaryTree';

describe('verticalTraversal', () => {
    const tree = createTreeByLevelTraseval([3,9,20,null,null,15,7]);

    test("verticalTraversal return", () => {
        expect(verticalTraversal(tree)).toEqual([[9],[3,15],[20],[7]]);
    });
    const tree1 = createTreeByLevelTraseval([0,5,1,9,null,2,null,null,null,null,3,4,8,6,null,null,null,7]);
    // test("verticalTraversal return", () => {
    //     expect(verticalTraversal(tree1)).toEqual([[9,7],[5,6],[0,2,4],[1,3],[8]]);
    // });
});