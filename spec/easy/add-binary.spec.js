import { addBinary } from '../../src/easy/add-binary';

describe('addBinary', () => {
    test("11, 1 return 100", () => {
        expect(addBinary('11', '1')).toEqual('100');
    });

    test("1010,1011 return 10101", () => {
        expect(addBinary('1010', '1011')).toEqual('10101');
    });

    test("1111,1111 return 11110", () => {
        expect(addBinary('1111', '1111')).toEqual('11110');
    });
});