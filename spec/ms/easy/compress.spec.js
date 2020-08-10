import { compress } from '../../../src/ms/easy/compress';

describe('compress', () => {
    test("return 100", () => {
        expect(compress(["a","a","b","b","c","c","c"])).toEqual(["a","2","b","2","c","3"]);
    });
});