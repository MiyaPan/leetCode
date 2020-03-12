import {lastDigit} from '../../src/easy/mod-big-num';

describe('is valid parentheses', () => {
    test(" 4, 1 return 4", () => {
        expect(lastDigit('4', '1')).toEqual(4);
    });

    test("'4', '2' return 6", () => {
        debugger
        expect(lastDigit('4', '2')).toEqual(6);
    });

    test("'9', '7' return 9", () => {
        expect(lastDigit('9', '7')).toEqual(9);
    });

    test("'10', '1000000 return 0", () => {
        expect(lastDigit('10', '100000000')).toEqual(0);
    });

    test("'3715290469715693021198967285016729344580685479654510946723', '68819615221552997273737174557165657483427362207517952651' return 7", () => {
        expect(lastDigit('3715290469715693021198967285016729344580685479654510946723', '68819615221552997273737174557165657483427362207517952651')).toEqual(7);
    });
});