import { groupAnagrams } from '../../../src/ms/medium/groupAnagrams';

describe('groupAnagrams', () => {
    // 顺序不同，无法通过，但实际是符合预期的
    test("701", () => {
        expect(groupAnagrams(["eat","tea","tan","ate","nat","bat"]))
            .toEqual([["bat"],["nat","tan"],["ate","eat","tea"]]);
    });
    // test("701", () => {
    //     expect(groupAnagrams(["ddddddddddg","dgggggggggg"]))
    //         .toEqual([["dgggggggggg"],["ddddddddddg"]]);
    // });
});