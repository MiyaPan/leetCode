import { pivotIndex } from '../../../src/ms/easy/pivotIndex';

describe('pivotIndex', () => {
    test("[1,7,3,6,5,6]", () => {
        expect(pivotIndex([1,7,3,6,5,6])).toEqual(3);
    });
    test("[1,7,3,6,5,6]", () => {
        expect(pivotIndex([-1,-1,0,1,1,0])).toEqual(5);
    });
});