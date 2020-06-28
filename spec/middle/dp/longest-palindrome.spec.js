import { longestPalindrome } from '../../../src/middle/dp/longest-palindrome';

describe('longestPalindrome', () => {
    test("return 100", () => {
        expect(longestPalindrome('babad')).toEqual('bab');
    });
});