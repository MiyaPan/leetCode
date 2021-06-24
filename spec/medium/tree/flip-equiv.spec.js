
import {flipEquiv} from '../../../src/medium/flip-equiv';
import * as testa from '../../../src/medium/flip-equiv';
import {createTreeByLevelTraseval} from '../../../src/utils/binaryTree';

describe('flipEquiv', () => {
    const root1 = createTreeByLevelTraseval([1,2,3,4,5,6,null,null,null,7,8]);
    const root2 = createTreeByLevelTraseval([1,3,2,null,6,4,5,null,null,null,null,8,7]);
console.log('test:', testa)
    test("flipEquiv return", () => {
        expect(flipEquiv(root1, root2)).toEqual(true);
    });
});