import { countAndSay, countAndSay1 } from '../../src/easy/count-and-say';

describe('countAndSay', () => {
    test("1 return 1", () => {
        expect(countAndSay(1)).toEqual('1');
    });

    test("4 return 1211", () => {
        expect(countAndSay(4)).toEqual('1211');
    });

    test("8 return 1113213211", () => {
        expect(countAndSay(8)).toEqual('1113213211');
    });
});

describe('countAndSay1', () => {
    test("1 return 1", () => {
        expect(countAndSay1(1)).toEqual('1');
    });

    test("4 return 1211", () => {
        expect(countAndSay1(4)).toEqual('1211');
    });

    test("8 return 1113213211", () => {
        expect(countAndSay1(8)).toEqual('1113213211');
    });
});