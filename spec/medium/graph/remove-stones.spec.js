import { removeStones } from '../../../src/medium/graph/remove-stones';

describe('removeStones', () => {
    test("701", () => {
        expect(removeStones([[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]))
            .toEqual(5);
    });
});