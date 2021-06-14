import { canPartitionKSubsets } from '../../../src/medium/can-partition-K-subsets';

describe('canPartitionKSubsets', () => {
    test("return 100", () => {
        expect(canPartitionKSubsets([10,10,10,7,7,7,7,7,7,6,6,6], 3)).toEqual(true);
    });
    test("return 100", () => {
        expect(canPartitionKSubsets([3522,181,521,515,304,123,2512,312,922,407,146,1932,4037,2646,3871,269],5)).toEqual(true);
    });
    test("return 100", () => {
        expect(canPartitionKSubsets([4,3,2,3,5,2,1], 4)).toEqual(true);
    });
});