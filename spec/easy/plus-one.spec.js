
import { plusOne, plusOne1 } from '../../src/easy/plus-one';

describe('plusOne', () => {
    test('[1,2,3] should return [1,2,4]', () => {
        expect(plusOne([1,2,3])).toEqual([1,2,4]);
    });

    test('[4,3,2,1] should return [4,3,2,2]', () => {
        expect(plusOne([4,3,2,1])).toEqual([4,3,2,2]);
    });

    test('[9, 9] should return [1,0,0]', () => {
        expect(plusOne([9,9])).toEqual([1,0,0]);
    });
    
    test('[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3] should return [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4]', () => {
        expect(plusOne([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3])).toEqual([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4]);
    });
});

describe('plusOne1', () => {
    test('[1,2,3] should return [1,2,4]', () => {
        expect(plusOne1([1,2,3])).toEqual([1,2,4]);
    });

    test('[4,3,2,1] should return [4,3,2,2]', () => {
        expect(plusOne1([4,3,2,1])).toEqual([4,3,2,2]);
    });

    test('[9, 9] should return [1,0,0]', () => {
        expect(plusOne1([9,9])).toEqual([1,0,0]);
    });
    
    test('[6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3] should return [6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4]', () => {
        expect(plusOne1([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,3])).toEqual([6,1,4,5,3,9,0,1,9,5,1,8,6,7,0,5,5,4,4]);
    });
});

