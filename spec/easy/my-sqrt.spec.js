import {mySqrt, mySqrt1} from '../../src/easy/my-sqrt';

describe('mySqrt', () => {
    test(" 4 return 2", () => {
        expect(mySqrt(4)).toEqual(2);
    });

    test(" 2 return 1", () => {
        expect(mySqrt(2)).toEqual(1);
    });

    test(" 8 return 2", () => {
        expect(mySqrt(8)).toEqual(2);
    });

    test(" 16 return 4", () => {
        expect(mySqrt(16)).toEqual(4);
    });

    test(" 6 return 2", () => {
        expect(mySqrt(6)).toEqual(2);
    });

    test(" 36 return 6", () => {
        expect(mySqrt(36)).toEqual(6);
    });

    test(" 1024 return 32", () => {
        debugger
        expect(mySqrt(1024)).toEqual(32);
    });
});

describe('mySqrt1', () => {
    test(" 4 return 2", () => {
        expect(mySqrt1(4)).toEqual(2);
    });

    test(" 2 return 1", () => {
        expect(mySqrt1(2)).toEqual(1);
    });

    test(" 8 return 2", () => {
        expect(mySqrt1(8)).toEqual(2);
    });

    test(" 16 return 4", () => {
        expect(mySqrt1(16)).toEqual(4);
    });
});