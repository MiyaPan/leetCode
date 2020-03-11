import { romanToInt, romanToInt2 } from '../../src/easy/romanToInt';

describe('romanToInt', () => {
    test('III return 3', () => {
        expect(romanToInt('III')).toEqual(3);
    });

    test('IV return 4', () => {
        expect(romanToInt('IV')).toEqual(4);
    });

    test('LVIII return 58', () => {
        expect(romanToInt('LVIII')).toEqual(58);
    });

    test('MCMXCIV return 1994', () => {
        expect(romanToInt('MCMXCIV')).toEqual(1994);
    });
});

describe('romanToInt2', () => {
    test('III return 3', () => {
        expect(romanToInt2('III')).toEqual(3);
    });

    test('IV return 4', () => {
        expect(romanToInt2('IV')).toEqual(4);
    });

    test('LVIII return 58', () => {
        expect(romanToInt2('LVIII')).toEqual(58);
    });

    test('MCMXCIV return 1994', () => {
        expect(romanToInt2('MCMXCIV')).toEqual(1994);
    });
});

