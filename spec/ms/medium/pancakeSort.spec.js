import { pancakeSort } from '../../../src/ms/medium/pancakeSort';

describe('pancakeSort', () => {
    test("fighting", () => {
        expect(pancakeSort([3,2,4,1])).toEqual([3,4,2,3,2]);
    });
});