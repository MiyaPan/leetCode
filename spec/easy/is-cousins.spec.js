
import {isCousins} from '../../src/easy/is-cousins';
import {createTreeByLevelTraseval} from '../../src/utils/binaryTree';

describe('isCousins', () => {
    const tree = createTreeByLevelTraseval([1,2,3,4]);
    test("tree return", () => {
        expect(isCousins(tree, 4, 3)).toEqual(false);
    });

    const tree1 = createTreeByLevelTraseval([1,2,3,null,4,null,5]);
    test("tree1 return", () => {
        expect(isCousins(tree1, 5, 4)).toEqual(true);
    });

    const tree2 = createTreeByLevelTraseval([1,2,3,null,4]);
    test("tree2 return", () => {
        expect(isCousins(tree2, 2, 3)).toEqual(false);
    });
    
    const tree3 = createTreeByLevelTraseval([1,2,3,null,null,4,5]);
    test("tree3 return", () => {
        expect(isCousins(tree3, 4, 5)).toEqual(false);
    });
});
