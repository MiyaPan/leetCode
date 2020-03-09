import { sumOfTwoNum } from '../../src/easy/sum-of-two-num.js';

describe('sum of 2 nums', () => {
    test('should return correctly', () => {
        const nums = [2, 7, 11, 15];
        const target = 9;
        expect(sumOfTwoNum(nums, target)).toEqual([0, 1]);
    })
});
