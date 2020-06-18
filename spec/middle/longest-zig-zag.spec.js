
import {longestZigZag} from '../../src/middle/longest-zig-zag';
import {createTreeByLevelTraseval} from '../../src/utils/binaryTree';

describe('longestZigZag', () => {
    const tree = createTreeByLevelTraseval([1,null,2,3,4,null,null,5,6,null,7,null,null,null,8,null,9]);

    test("longestZigZag return", () => {
        expect(longestZigZag(tree)).toEqual(3);
    });
});