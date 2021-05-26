// import { longestPalindrome } from '../../../src/medium/dp/longest-palindrome';
import { longestPalindrome } from '../../../src/ms/medium/longestPalindrome';

describe('longestPalindrome', () => {
    test("return 100", () => {
        expect(longestPalindrome("aacabdkacaa")).toEqual('aca'); 
    });
    // test("return 100", () => {
    //     expect(longestPalindrome('babad')).toEqual('bab'); 
    // });
});