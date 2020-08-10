
import {constructFromPrePost} from '../../src/middle/construct-from-pre-post';
import {levelOrder} from '../../../src/easy/level-order-base';

describe('constructFromPrePost', () => {
    test("constructFromPrePost return", () => {
        expect(levelOrder(constructFromPrePost([1,2,4,5,3,6,7],[4,5,2,6,7,3,1]))).toEqual([1,2,3,4,5,6,7]);
    });

    // test("constructFromPrePost return", () => {
    //     expect(levelOrder(constructFromPrePost([2,1],[1,2]))).toEqual([2,1]);
    // });

    // test("constructFromPrePost return", () => {
    //     expect(levelOrder(constructFromPrePost([2,1,3],[3,1,2]))).toEqual([2,1,null,3]);
    // });

    // test("constructFromPrePost return", () => {
    //     expect(levelOrder(constructFromPrePost([4,2,1,3],[3,1,2,4]))).toEqual([4,2,null,1,null,3]);
    // });
});