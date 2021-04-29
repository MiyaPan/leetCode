import { findItinerary } from '../../../src/ms/medium/findItinerary';

describe('findItinerary', () => {
    test("701", () => {
        expect(findItinerary([["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]])).toEqual(["JFK","MUC","LHR","SFO","SJC"]);
    });
    // test("701", () => {
    //     expect(findItinerary([["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]])).toEqual(['JFK', "NRT", 'JFK', "KUL"]);
    // });
    // test("701", () => {
    //     expect(findItinerary([["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]])).toEqual(["JFK","ATL","JFK","SFO","ATL","SFO"]);
    // });
});