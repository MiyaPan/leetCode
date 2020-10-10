import { isValidBST3 } from '../../../src/ms/medium/isValidBST';

describe('isValidBST2', () => {
    let t = {
        val: 2,
        left: {
            val: 1,
            left: null,
            right: null
        },
        right: {
            val: 3,
            left: null,
            right: null
        }
    }
    test("701", () => {
        expect(isValidBST3(t)).toEqual(true);
    });
});