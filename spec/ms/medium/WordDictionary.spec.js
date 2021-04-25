import { WordDictionary } from '../../../src/ms/medium/WordDictionary';

describe('WordDictionary', () => {
    let wordDictionary = new WordDictionary();
    wordDictionary.addWord("bad");
    wordDictionary.addWord("dad");
    wordDictionary.addWord("mad");
    
    // test("701", () => {
    //     expect(wordDictionary.search("pad")).toEqual(false);
    // });
    // test("701", () => {
    //     expect(wordDictionary.search("bad")).toEqual(true);
    // });
    test("701", () => {
        expect(wordDictionary.search(".ad")).toEqual(true);
    });
    // test("701", () => {
    //     expect(wordDictionary.search("b..")).toEqual(true);
    // });
});