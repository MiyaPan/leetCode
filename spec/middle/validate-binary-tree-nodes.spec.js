
import {validateBinaryTreeNodes} from '../../src/middle/validate-binary-tree-nodes';

describe('validateBinaryTreeNodes', () => {

    test("validateBinaryTreeNodes return", () => {
        expect(validateBinaryTreeNodes(2, [-1,0], [-1,-1])).toEqual(true);
    });
});