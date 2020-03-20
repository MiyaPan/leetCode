import { removeDuplicates } from '../../src/easy/remove-duplicates';

describe('removeDuplicates', () => {
    test('[1,1,2] return 2', () => {
        expect(removeDuplicates([1,1,2])).toEqual(2);
    });

    test('[0,0,1,1,1,2,2,3,3,4] return 5', () => {
        expect(removeDuplicates([0,0,1,1,1,2,2,3,3,4])).toEqual(5);
    });

    test('[0] return 1', () => {
        expect(removeDuplicates([0])).toEqual(1);
    });

    test('[] return 0', () => {
        expect(removeDuplicates([])).toEqual(0);
    });
});