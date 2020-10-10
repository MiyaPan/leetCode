import { subarraySum } from '../../../src/ms/medium/subarraySum';

describe('subarraySum', () => {
    test("[1,2,1,2,1],3", () => {
        expect(subarraySum([1,2,1,2,1],3)).toEqual(4);
    });
});