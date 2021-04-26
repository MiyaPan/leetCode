import { combine } from '../../../src/ms/medium/combine';

describe('combine', () => {
    // test("701", () => {
    //     expect(combine(4, 2)).toEqual([[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]);
    // });
    test("701", () => {
        expect(combine(1, 1)).toEqual([[1]]);
    });
});