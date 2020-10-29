import { reverseBetween } from '../../../src/ms/medium/reverseBetween';

describe('reverseBetween', () => {
    test("701", () => {
        let head = {
            val: 3,
            next: {
                val: 5,
                next: null
            }
        }
        
        expect(reverseBetween(head, 1, 2)).toEqual(true);
    });
});