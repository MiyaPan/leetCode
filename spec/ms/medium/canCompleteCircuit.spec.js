import { canCompleteCircuit } from '../../../src/ms/medium/canCompleteCircuit';

describe('canCompleteCircuit', () => {
    // test("701", () => {
    //     expect(canCompleteCircuit([3,3,4],[3,4,4])).toEqual(-1);
    // });
    test("701", () => {
        expect(canCompleteCircuit([1,2,3,4,5],[3,4,5,1,2])).toEqual(3);
    });
});