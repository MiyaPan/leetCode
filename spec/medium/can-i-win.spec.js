
import {canIWin} from '../../src/medium/can-i-win';

describe('canIWin', () => {
    test("canIWin return", () => {
        expect(canIWin(4,6)).toEqual(true);
    });
    test("canIWin return", () => {
        expect(canIWin(10,11)).toEqual(false);
    });
});