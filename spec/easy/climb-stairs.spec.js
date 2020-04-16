import { climbStairs, climbStairs1 } from '../../src/easy/climb-stairs';

describe('climbStairs', () => {
    test("2 return 2", () => {
        expect(climbStairs(2)).toEqual(2);
    });

    test("3 return 3", () => {
        expect(climbStairs(3)).toEqual(3);
    });

    test("4 return 5", () => {
        expect(climbStairs(4)).toEqual(5);
    });
});

describe('climbStairs1', () => {
    test("2 return 2", () => {
        expect(climbStairs1(2)).toEqual(2);
    });

    test("3 return 3", () => {
        expect(climbStairs1(3)).toEqual(3);
    });

    test("4 return 5", () => {
        expect(climbStairs1(4)).toEqual(5);
    });
});