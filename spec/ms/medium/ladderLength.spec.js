import { ladderLength } from '../../../src/ms/medium/ladderLength';

describe('ladderLength', () => {
    test("701", () => {
        expect(ladderLength('a', 'c', ['a', 'b', 'c'])).toEqual(2);
    });
    test("701", () => {
        expect(ladderLength('hit', 'cog', ["hot","dot","dog","lot","log","cog"])).toEqual(5);
    });
    test("701", () => {
        expect(ladderLength("hot","dot",["hot","dot","dog"])).toEqual(2);
    });
});