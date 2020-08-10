import { minimumTotal } from '../../../src/middle/dp/minimum-total';

describe('minimumTotal', () => {
    test("return 100", () => {
        expect(minimumTotal([[2],[3,4],[6,5,7],[4,1,8,3]])).toEqual(11);
    });
});