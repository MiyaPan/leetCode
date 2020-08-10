import { isPalindrome } from '../../../src/ms/easy/isPalindrome';

describe('isPalindrome', () => {
    // test("return 100", () => {
    //     let a = {
    //         val: 1,
    //         next: {
    //             val: 2,
    //             next: null
    //         }
    //     }
    //     expect(isPalindrome(a)).toEqual(false);
    // });
    // test("return 100", () => {
    //     let a = {
    //         val: 1,
    //         next: {
    //             val: 0,
    //             next:  {
    //                 val: 0,
    //                 next: null
    //             }
    //         }
    //     }
    //     expect(isPalindrome(a)).toEqual(false);
    // });
    test("101", () => {
        let a = {
            val: 1,
            next: {
                val: 0,
                next:  {
                    val: 1,
                    next: null
                }
            }
        }
        expect(isPalindrome(a)).toEqual(true);
    });
});