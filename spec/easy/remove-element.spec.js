import { removeElement } from '../../src/easy/remove-element';

describe('removeElement', () => {
    test('[1,1,2], 2 return 2', () => {
        expect(removeElement([1,1,2], 2)).toEqual(2);
    });

    test('[3,2,2,3], 2 return 2', () => {
        expect(removeElement([3,2,2,3], 2)).toEqual(2);
    });

    test('[0,1,2,2,3,0,4,2], 2 return 5', () => {
        expect(removeElement([0,1,2,2,3,0,4,2], 2)).toEqual(5);
    });

    test('[0], 0 return 0', () => {
        expect(removeElement([0], 0)).toEqual(0);
    });

    test('[] return 0', () => {
        expect(removeElement([])).toEqual(0);
    });
});