import { longestCommonPrefix } from '../../src/easy/longest-common-prefix';

describe('longestCommonPrefix', () => {
    test("['flower', 'flow', 'flight'] return fl", () => {
        expect(longestCommonPrefix(['flower', 'flow', 'flight'])).toEqual('fl');
    });

    test("['adfa', 'flow', 'ddddd'] return ''", () => {
        expect(longestCommonPrefix(['adfa', 'flow', 'ddddd'])).toEqual('');
    });

    test("['c', 'c'] return 'c'", () => {
        expect(longestCommonPrefix(['c', 'c'])).toEqual('c');
    });

    test("['a', 'b'] return ''", () => {
        expect(longestCommonPrefix(['a', 'b'])).toEqual('');
    });

    test("['aa', 'aa'] return 'aa'", () => {
        expect(longestCommonPrefix(['aa', 'aa'])).toEqual('aa');
    });

    test("['a', 'a', 'b'] return ''", () => {
        expect(longestCommonPrefix(['a', 'a', 'b'])).toEqual('');
    });
});
