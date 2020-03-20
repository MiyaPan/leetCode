import { indexOf } from '../../src/easy/index-of';

describe('indexOf', () => {
    test("'hello', 'll' return 2", () => {
        expect(indexOf('hello', 'll')).toEqual(2);
    });

    test("'aaaa', 'll' return -1", () => {
        expect(indexOf('aaaa', 'll')).toEqual(-1);
    });

    test('"" return 0', () => {
        expect(indexOf('aaa', '')).toEqual(0);
    });

    test('"mississippi", "issipi" return -1', () => {
        expect(indexOf("mississippi", "issipi")).toEqual(-1);
    });

    test('"mississippi","issip" return 4', () => {
        expect(indexOf("mississippi","issip")).toEqual(4);
    });

    test('"mississippi", "pi" return 9', () => {
        expect(indexOf("mississippi", "pi")).toEqual(9);
    });
});