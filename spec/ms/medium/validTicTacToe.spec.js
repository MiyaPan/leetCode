import { validTicTacToe } from '../../../src/ms/medium/validTicTacToe';

describe('validTicTacToe', () => {
    test("701", () => {
        expect(validTicTacToe(["XOX","OOX","XO "])).toEqual(true);
    });
});