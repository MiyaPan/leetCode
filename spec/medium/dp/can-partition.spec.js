import { canPartition } from '../../../src/medium/can-partition';

describe('canPartition', () => {
    test("return 7", () => {
        expect(canPartition([1,2,5])).toEqual(false);
    });
    test("return 7", () => {
        expect(canPartition([23,13,11,7,6,5,5])).toEqual(true);
    });
});