import { findDuplicate } from '../../../src/middle/binary-search/find-duplicate';

describe('findDuplicate', () => {
    test("return 100", () => {
        expect(findDuplicate([1,3,4,2,2])).toEqual(2);
    });
});