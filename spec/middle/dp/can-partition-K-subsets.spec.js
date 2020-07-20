import { canPartitionKSubsets } from '../../../src/middle/dp/can-partition-K-subsets';

describe('canPartitionKSubsets', () => {
    // test("return 100", () => {
    //     expect(canPartitionKSubsets([10,10,10,7,7,7,7,7,7,6,6,6], 3)).toEqual(true);
    // });
    test("return 100", () => {
        expect(canPartitionKSubsets([4,3,2,3,5,2,1], 4)).toEqual(true);
    });
});