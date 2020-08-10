import { convertToTitle } from '../../../src/ms/easy/convertToTitle';

describe('convertToTitle', () => {
    // test("52", () => {
    //     expect(convertToTitle(52)).toEqual("AZ");
    // });
    test("701", () => {
        expect(convertToTitle(701)).toEqual("ZY");
    });
});