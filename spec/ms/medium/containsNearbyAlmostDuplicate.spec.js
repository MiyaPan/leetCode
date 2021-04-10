import { containsNearbyAlmostDuplicate } from '../../../src/ms/medium/containsNearbyAlmostDuplicate';

describe('containsNearbyAlmostDuplicate', () => {
    test("701", () => {
        expect(containsNearbyAlmostDuplicate([2147483646,2147483647], 3, 3)).toEqual(true);
    });
});