import { reorganizeString } from '../../../src/ms/medium/reorganizeString';

describe('reorganizeString', () => {
    test("701", () => {
        expect(reorganizeString("aab")).toEqual("aba");
    });
});