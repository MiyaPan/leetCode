import { generateMatrix } from '../../../src/ms/medium/generateMatrix';

describe('generateMatrix', () => {
    test("701", () => { 
        expect(generateMatrix(3)).toEqual([[1,2,3],[8,9,4],[7,6,5]]);
    });
});