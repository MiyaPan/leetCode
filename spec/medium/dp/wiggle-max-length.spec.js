import { wiggleMaxLength } from '../../../src/middle/dp/wiggle-max-length';

describe('wiggleMaxLength', () => {
    test("return 7", () => {
        expect(wiggleMaxLength([1,17,5,10,13,15,10,5,16,8])).toEqual(7);
    });
});