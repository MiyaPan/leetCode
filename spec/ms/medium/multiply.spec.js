import { multiply } from '../../../src/ms/medium/multiply';

describe('multiply', () => {
    test("701", () => {
        expect(multiply('2', '3')).toEqual('6');
    });
    test("701", () => {
        expect(multiply('123', '456')).toEqual("56088");
    });
    test("701", () => {
        expect(multiply('9', '9')).toEqual("81");
    });
    test("701", () => {
        expect(multiply('8', '99')).toEqual("792");
    });
    test("701", () => {
        expect(multiply("123456789","987654321")).toEqual("121932631112635269");
    });
});