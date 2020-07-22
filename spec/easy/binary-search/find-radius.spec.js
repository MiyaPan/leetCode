import { findRadius } from '../../../src/easy/binary-search/find-radius';

describe('findRadius', () => {
    test("11, 1 return 100", () => {
        expect(findRadius([1,2,3], [1,2,3])).toEqual(0);
    });
});