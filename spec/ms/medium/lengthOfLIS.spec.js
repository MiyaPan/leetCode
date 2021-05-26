import { lengthOfLIS } from '../../../src/ms/medium/lengthOfLIS';

describe('lengthOfLIS', () => {
    // test("701", () => {
    //     expect(lengthOfLIS('a', 'c', ['a', 'b', 'c'])).toEqual(2);
    // });
    // test("701", () => { 
    //     expect(lengthOfLIS('hit', 'cog', ["hot","dot","dog","lot","log","cog"])).toEqual(5);
    // });
    // test("701", () => {
    //     expect(lengthOfLIS("hot","dot",["hot","dot","dog"])).toEqual(2);
    // });
    test("fighting", () => {
        expect(lengthOfLIS([10,9,2,5,3,7,101,18])).toEqual(4);
    });
    test("fighting", () => {
        expect(lengthOfLIS([0,1,0,3,2,3])).toEqual(4);
    });
});