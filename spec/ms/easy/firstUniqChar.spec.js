import { firstUniqChar } from '../../../src/ms/easy/firstUniqChar';

describe('firstUniqChar', () => {
    test("701", () => {
        expect(firstUniqChar("dddccdbba")).toEqual(8);
    });
});