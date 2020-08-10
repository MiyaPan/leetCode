import { bestSeqAtIndex } from '../../../src/medium/binary-search/best-seq-atIndex';

describe('bestSeqAtIndex', () => {
    // test("return 100", () => {
    //     expect(bestSeqAtIndex([8378,8535,8998,3766,648,6184,5506,5648,3907,6773],[9644,849,3232,3259,5229,314,5593,9600,6695,4340])).toEqual(4);
    // });
    test("return 100", () => {
        expect(bestSeqAtIndex([65,70,56,75,60,68],[100,150,90,190,95,110])).toEqual(6);
    });
});