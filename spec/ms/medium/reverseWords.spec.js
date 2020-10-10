import { reverseWords } from '../../../src/ms/medium/reverseWords';

describe('reverseWords', () => {
    test("701", () => {
        expect(reverseWords([[1,2,3],[4,5,6],[7,8,9]])).toEqual([1,2,3,6,9,8,7,4,5]);
    });
});