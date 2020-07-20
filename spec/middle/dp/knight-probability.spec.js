import { knightProbability } from '../../../src/middle/dp/knight-probability';

describe('knightProbability', () => {
    test("return 100", () => {
        expect(knightProbability(3, 2, 0, 0)).toEqual(0.0625);
    });
});