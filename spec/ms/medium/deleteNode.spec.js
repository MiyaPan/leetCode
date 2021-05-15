
import {deleteNode} from '../../../src/ms/medium/deleteNode';
import {createTreeByLevelTraseval} from '../../../src/utils/binaryTree';

describe('distanceK', () => {
    const tree = createTreeByLevelTraseval([5,3,6,2,4,null,7]);
    const tree1 = createTreeByLevelTraseval([5,4,6,2,null,null,7]);

    test("distanceK return", () => {
        expect(deleteNode(tree, 3)).toEqual(tree1);
    });
});