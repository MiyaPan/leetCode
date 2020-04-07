import { searchInsert, searchInsert1 } from '../../src/easy/search-insert';

describe('searchInsert', () => {
    test("[1,3,5,6], 0 return 0", () => {
        expect(searchInsert([1,3,5,6], 0)).toEqual(0);
    });

    test("[1,3,5,6], 2 return 1", () => {
        expect(searchInsert([1,3,5,6], 0)).toEqual(0);
    });

    test("[1,3,5,6], 5 return 2", () => {
        expect(searchInsert([1,3,5,6], 0)).toEqual(0);
    });

    test("[1,3,5,6], 7 return 4", () => {
        expect(searchInsert([1,3,5,6], 0)).toEqual(0);
    });
});

describe('searchInsert1', () => {
    test("[1,3,5,6], 0 return 0", () => {
        expect(searchInsert1([1,3,5,6], 0)).toEqual(0);
    });

    test("[1,3,5,6], 2 return 1", () => {
        expect(searchInsert1([1,3,5,6], 0)).toEqual(0);
    });

    test("[1,3,5,6], 5 return 2", () => {
        expect(searchInsert1([1,3,5,6], 0)).toEqual(0);
    });

    test("[1,3,5,6], 7 return 4", () => {
        expect(searchInsert1([1,3,5,6], 0)).toEqual(0);
    });

    test("[1,3], 2 return 4", () => {
        expect(searchInsert1([1,3], 2)).toEqual(1);
    });
});