import { isAnagram } from '../../../src/ms/easy/isAnagram';

describe('isAnagram', () => {
    test("701", () => {
        expect(isAnagram("anagram", "nagaram")).toEqual(true);
    });
});