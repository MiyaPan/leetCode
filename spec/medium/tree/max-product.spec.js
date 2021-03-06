
import {maxProduct, maxProduct1} from '../../src/middle/max-product-in-tree';
import {createTreeByLevelTraseval} from '../../../src/utils/binaryTree';
import {arr2Tree} from '../../../src/mock';

describe('maxProduct', () => {
    const tree = createTreeByLevelTraseval(arr2Tree);

    test("maxProduct return", () => {
        expect(maxProduct(tree)).toEqual(110);
    });
    // test("maxProduct return", () => {
    //     expect(maxProduct1(tree)).toEqual(110);
    // });
});