import { canPartition } from '../../../src/middle/dp/can-partition';

describe('canPartition', () => {
    test("return 7", () => {
        expect(canPartition([23,13,11,7,6,5,5])).toEqual(true);
    });
});