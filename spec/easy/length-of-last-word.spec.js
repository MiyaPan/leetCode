import { lengthOfLastWord, lengthOfLastWord1, lengthOfLastWord2 } from '../../src/easy/length-of-last-word';

describe('lengthOfLastWord', () => {
    test('"a " return 1', () => {
        expect(lengthOfLastWord('a')).toEqual(1);
    });

    test('"Hello World" return 5', () => {
        expect(lengthOfLastWord('Hello World')).toEqual(5);
    });
});

describe('lengthOfLastWord1', () => {
    test('"a " return 1', () => {
        expect(lengthOfLastWord1('a')).toEqual(1);
    });

    test('"Hello World" return 5', () => {
        expect(lengthOfLastWord1('Hello World')).toEqual(5);
    });

    test('"a b  " return 1', () => {
        expect(lengthOfLastWord1('a b  ')).toEqual(1);
    });
});

describe('lengthOfLastWord2', () => {
    test('"a " return 1', () => {
        expect(lengthOfLastWord2('a')).toEqual(1);
    });

    test('"Hello World" return 5', () => {
        expect(lengthOfLastWord2('Hello World')).toEqual(5);
    });

    test('"a b  " return 1', () => {
        expect(lengthOfLastWord2('a b  ')).toEqual(1);
    });
});