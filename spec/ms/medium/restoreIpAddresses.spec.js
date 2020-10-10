import { restoreIpAddresses } from '../../../src/ms/medium/restoreIpAddresses';

describe('restoreIpAddresses', () => {
    test("25525511135", () => {
        expect(restoreIpAddresses("25525511135")).toEqual(["255.255.11.135","255.255.111.35"]);
    });
    test("0000", () => {
        expect(restoreIpAddresses("0000")).toEqual(["0.0.0.0"]);
    });
    test("1111", () => {
        expect(restoreIpAddresses("1111")).toEqual(["1.1.1.1"]);
    });
    test("010010", () => {
        expect(restoreIpAddresses("010010")).toEqual(["0.10.0.10","0.100.1.0"]);
    });
    test("0690", () => {
        expect(restoreIpAddresses("0690")).toEqual(["0.6.9.0"]);
    });
});