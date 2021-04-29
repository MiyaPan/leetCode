import { topKFrequent } from '../../../src/ms/medium/topKFrequent2';

describe('topKFrequent', () => {
    test("701", () => {
        expect(topKFrequent(
                ["akjkun","hobievq","ibbb","jhw","pxwsurrun","hxfwhrjm","pxwsurrun","wjo","pxwsurrun","wfetx","ydp","qfazmji","qfazmji","llvabr","uaq","kyj","uaq","wuzvu","nze","qznvdw","wjo","uaq","qfazmji","uaq","hxfwhrjm","ftmcuyb","rmjim","omx","omx","jgqdwle","ehoc","nze","jgqdwle","kyj","erkc","wfetx","wjo","wjo","rmldehuuff","wfetx","qznvdw","jhw","jhw","pxwsurrun","rmldehuuff","omx","yhriclj","pxwsurrun","kyj","erkc","wfetx","pxwsurrun","gukcclzd","llvabr","cpgyk","jhw","llvabr","qfazmji","llvabr","yhriclj","zvefqcz","fiwdfgzs","pqpozde","nze","qfazmji","qznvdw","kyj","ydp","wuzvu","erkc","qznvdw","yhriclj","akjkun","rmjim","moeuarod","hvxg","nze","rmldehuuff","jhw","rmldehuuff","wjo","cpgyk","omx","hlak","kyj","hxfwhrjm","qfazmji","gukcclzd","pqpozde","wfetx","wahno","cpgyk","nze","ibbb","wjo","wuzvu","kyj","kyj","zvefqcz","rmjim","erkc","llvabr","omx","hobievq","pxwsurrun","wahno","akjkun","jgqdwle","nze","ftmcuyb","wuzvu","hxfwhrjm","ibbb","wfetx","akjkun","omx","hxfwhrjm","hlak","rmldehuuff","hxfwhrjm","jhw","pxwsurrun","omx","wjo","hlak","zvefqcz","ehoc","wuzvu","pqpozde","cgwncxeof","jhw","hlak","usaq","wqnez","qznvdw","ibbb","erkc","wfetx","hlak","cpgyk","hxfwhrjm","wuzvu","jaar","hlak","wahno","hlak","ibbb","nze","omx","wfetx","erkc","kyj","pqpozde","hlak","nze","wjo","cgwncxeof","uaq","kyj","wahno","cgwncxeof","hlak","rmldehuuff","hlak","wfetx","wahno","kyj","yhriclj","nze","jgqdwle","fiwdfgzs","jhw","wuzvu","wfetx","ibbb","ydp","hobievq","rmjim","ehoc","jhw","hobievq","rmldehuuff","wuzvu","gukcclzd","wuzvu","jhw","qfazmji","wjo","qfazmji","wuzvu","ehoc","omx","nze","jgqdwle","pxwsurrun","omx","gukcclzd","jaar","uaq","qznvdw","ibbb","hxfwhrjm"],
                24
            )).toEqual(
                ["hlak","jhw","kyj","nze","omx","wfetx","wuzvu","pxwsurrun","wjo","hxfwhrjm","qfazmji","ibbb","rmldehuuff","erkc","qznvdw","uaq","jgqdwle","llvabr","wahno","akjkun","cpgyk","ehoc","gukcclzd","hobievq"]
            );
    });
    // test("701", () => {
    //     expect(topKFrequent(["yhriclj", "cpgyk", "gukcclzd", "ehoc", "hobievq", "rmjim"], 3)).toEqual(["cpgyk", "ehoc", "gukcclzd"]);
    // });
    // test("701", () => {
    //     expect(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 3)).toEqual(["i","love","coding"]);
    // });
    // test("701", () => {
    //     expect(topKFrequent(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4)).toEqual(["the","is","sunny","day"]);
    // });
    test("701", () => {
        expect(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2)).toEqual(["i","love"]);
    });
});