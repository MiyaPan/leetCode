import { removeKdigits } from '../../../src/ms/medium/removeKdigits';

describe('removeKdigits', () => {
    test("701", () => {
        expect(removeKdigits('10200', 1)).toEqual('200');
    });
    // test("701", () => {
    //     expect(removeKdigits('1432219', 3)).toEqual('1219');
    // });
});