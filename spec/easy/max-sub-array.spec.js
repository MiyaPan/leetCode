import { maxSubArray, divideAndConquer, dynamicProgramming, dynamicProgramming2 } from '../../src/easy/max-sub-array';

describe('maxSubArray', () => {
    test('[1,1,2] return 4', () => {
        expect(maxSubArray([1,1,2])).toEqual(4);
    });

    test('[0,0,-1,1,1,2,-2,3,3,-4] return 8', () => {
        expect(maxSubArray([0,0,-1,1,1,2,-2,3,3,-4])).toEqual(8);
    });

    test('[0] return 0', () => {
        expect(maxSubArray([0])).toEqual(0);
    });

    test('[-2,1,-3,4,-1,2,1,-5,4] return 6', () => {
        expect(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])).toEqual(6);
    });

    test('[-2,1] return 1', () => {
        expect(maxSubArray([-2,1])).toEqual(1);
    });

    test('[-1,0,-2] return 0', () => {
        expect(maxSubArray([-1,0,-2])).toEqual(0);
    });
});

describe('divideAndConquer', () => {
    test('[1,1,2] return 4', () => {
        expect(divideAndConquer([1,1,2])).toEqual(4);
    });

    test('[0,0,-1,1,1,2,-2,3,3,-4] return 8', () => {
        expect(divideAndConquer([0,0,-1,1,1,2,-2,3,3,-4])).toEqual(8);
    });

    test('[0] return 0', () => {
        expect(divideAndConquer([0])).toEqual(0);
    });

    test('[-2,1,-3,4,-1,2,1,-5,4] return 6', () => {
        expect(divideAndConquer([-2,1,-3,4,-1,2,1,-5,4])).toEqual(6);
    });

    test('[-2,1] return 1', () => {
        expect(divideAndConquer([-2,1])).toEqual(1);
    });

    test('[-1,0,-2] return 0', () => {
        debugger
        expect(divideAndConquer([-1,0,-2])).toEqual(0);
    });
});

describe('dynamicProgramming', () => {
    test('[1,1,2] return 4', () => {
        expect(dynamicProgramming([1,1,2])).toEqual(4);
    });

    test('[0,0,-1,1,1,2,-2,3,3,-4] return 8', () => {
        expect(dynamicProgramming([0,0,-1,1,1,2,-2,3,3,-4])).toEqual(8);
    });

    test('[0] return 0', () => {
        expect(dynamicProgramming([0])).toEqual(0);
    });

    test('[-2,1,-3,4,-1,2,1,-5,4] return 6', () => {
        expect(dynamicProgramming([-2,1,-3,4,-1,2,1,-5,4])).toEqual(6);
    });

    test('[-2,1] return 1', () => {
        expect(dynamicProgramming([-2,1])).toEqual(1);
    });

    test('[-1,0,-2] return 0', () => {
        expect(dynamicProgramming([-1,0,-2])).toEqual(0);
    });
});

describe('dynamicProgramming2', () => {
    test('[1,1,2] return 4', () => {
        expect(dynamicProgramming2([1,1,2])).toEqual(4);
    });

    test('[0,0,-1,1,1,2,-2,3,3,-4] return 8', () => {
        expect(dynamicProgramming2([0,0,-1,1,1,2,-2,3,3,-4])).toEqual(8);
    });

    test('[0] return 0', () => {
        expect(dynamicProgramming2([0])).toEqual(0);
    });

    test('[-2,1,-3,4,-1,2,1,-5,4] return 6', () => {
        expect(dynamicProgramming2([-2,1,-3,4,-1,2,1,-5,4])).toEqual(6);
    });

    test('[-2,1] return 1', () => {
        expect(dynamicProgramming2([-2,1])).toEqual(1);
    });

    test('[-1,0,-2] return 0', () => {
        expect(dynamicProgramming2([-1,0,-2])).toEqual(0);
    });
});