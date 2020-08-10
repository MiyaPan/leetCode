import { reverseOnlyLetters } from '../../../src/ms/easy/reverseOnlyLetters';

describe('reverseOnlyLetters', () => {
    test("return 100", () => {
        expect(reverseOnlyLetters("a-bC-dEf-ghIj")).toEqual("j-Ih-gfE-dCba");
    });
    test("return 100", () => {
        expect(reverseOnlyLetters("ab-cd")).toEqual("dc-ba");
    });
    test("return 100", () => {
        expect(reverseOnlyLetters("-S2,_")).toEqual("-S2,_");
    });
});