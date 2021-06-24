// import { exist } from '../../../src/ms/medium/exist';
import { exist } from '../../../src/JianZhiOffer/medium/exist';

describe('exist', () => {
    // let board =
    //     [
    //         ['A','B','C','E'],
    //         ['S','F','C','S'],
    //         ['A','D','E','E']
    //     ];
    // let word = 'ABCB';
    // test("should be false", () => {
    //     expect(exist(board, word)).toEqual(false);
    // });
    let board =
        [
            ['A','B','C','E'],
            ['S','F','E','S'],
            ['A','D','E','E']
        ];
    let word = 'ABCESEEEFS';
    test("should be true", () => {
        expect(exist(board, word)).toEqual(true);
    });
});