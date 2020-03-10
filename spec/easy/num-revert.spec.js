import { numRevert } from '../../src/easy/num-revert';

describe('num revert', () => {
    test('shoule correct', () => {
        expect(numRevert(12345)).toEqual(54321);
    });

    test('shoule correct', () => {
        expect(numRevert(-12345)).toEqual(54321);
    })
});

