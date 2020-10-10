import { spiralOrder } from '../../../src/ms/medium/spiralOrder';

describe('spiralOrder', () => {
    test("701", () => {
        expect(spiralOrder([[1,2,3],[4,5,6],[7,8,9]])).toEqual([1,2,3,6,9,8,7,4,5]);
    });
});