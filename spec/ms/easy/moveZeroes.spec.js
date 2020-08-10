import { moveZeroes } from '../../../src/ms/easy/moveZeroes';

describe('moveZeroes', () => {
    test("701", () => {
        expect(moveZeroes([0,1,0,3,12])).toEqual([1,3,12,0,0]);
    });
});