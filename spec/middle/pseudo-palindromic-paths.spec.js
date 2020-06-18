
import {pseudoPalindromicPaths, pseudoPalindromicPaths1,pseudoPalindromicPaths2} from '../../src/middle/pseudo-palindromic-paths';
import {createTreeByLevelTraseval} from '../../src/utils/binaryTree';

describe('pseudoPalindromicPaths', () => {
    const tree = createTreeByLevelTraseval([2,3,1,3,1,null,1]);

    // test("pseudoPalindromicPaths return", () => {
    //     expect(pseudoPalindromicPaths(tree)).toEqual(2);
    // });

    // test("pseudoPalindromicPaths return", () => {
    //     expect(pseudoPalindromicPaths1(tree)).toEqual(2);
    // });

    test("pseudoPalindromicPaths return", () => {
        expect(pseudoPalindromicPaths2(tree)).toEqual(2);
    });
});