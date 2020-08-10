
import {isValidSerialization} from '../../src/middle/is-valid-serialization-pre';

describe('isValidSerialization', () => {
    test("isValidSerialization return", () => {
        expect(isValidSerialization("9,3,4,#,#,1,#,#,2,#,6,#,#")).toEqual(true);
    });

    test("isValidSerialization return", () => {
        expect(isValidSerialization("1,#")).toEqual(false);
    });

    test("isValidSerialization return", () => {
        expect(isValidSerialization("9,#,#,1")).toEqual(false);
    });

    test("isValidSerialization return", () => {
        expect(isValidSerialization("91,13,14,#,#,10")).toEqual(false);
    });

    test("isValidSerialization return", () => {
        expect(isValidSerialization("#,7,6,9,#,#,#")).toEqual(false);
    });
});