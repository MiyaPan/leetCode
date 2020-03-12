import {isValidParentheses, isValidParentheses2, isValidParentheses3} from '../../src/easy/is-valid-parentheses';

describe('is valid parentheses', () => {
    test("'()' return true", () => {
        expect(isValidParentheses('()')).toEqual(true);
    });

    test("'()[]{}' return true", () => {
        expect(isValidParentheses('()[]{}')).toEqual(true);
    });

    test("'(]' return true", () => {
        expect(isValidParentheses('(]')).toEqual(false);
    });

    test("'([)]' return true", () => {
        expect(isValidParentheses('([)]')).toEqual(false);
    });

    test("'{[]}' return true", () => {
        expect(isValidParentheses('{[]}')).toEqual(true);
    });
});

describe('is valid parentheses2', () => {
    test("'()' return true", () => {
        expect(isValidParentheses2('()')).toEqual(true);
    });

    test("'()[]{}' return true", () => {
        expect(isValidParentheses2('()[]{}')).toEqual(true);
    });

    test("'(]' return true", () => {
        expect(isValidParentheses2('(]')).toEqual(false);
    });

    test("'([)]' return true", () => {
        expect(isValidParentheses2('([)]')).toEqual(false);
    });

    test("'{[]}' return true", () => {
        expect(isValidParentheses2('{[]}')).toEqual(true);
    });
});

describe('is valid parentheses3', () => {
    test("'()' return true", () => {
        expect(isValidParentheses3('()')).toEqual(true);
    });

    test("'()[]{}' return true", () => {
        expect(isValidParentheses3('()[]{}')).toEqual(true);
    });

    test("'(]' return true", () => {
        expect(isValidParentheses3('(]')).toEqual(false);
    });

    test("'([)]' return true", () => {
        expect(isValidParentheses3('([)]')).toEqual(false);
    });

    test("'{[]}' return true", () => {
        expect(isValidParentheses3('{[]}')).toEqual(true);
    });
});