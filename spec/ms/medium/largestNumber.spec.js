import { largestNumber } from '../../../src/ms/medium/largestNumber';

describe('largestNumber', () => {
    test("[1,2,1,2,1],3", () => {
        expect(largestNumber([432,43243])).toEqual("43243432");
    });
    test("[1,2,1,2,1],3", () => {
        expect(largestNumber([10,2])).toEqual('210');
    });
    test("[1,2,1,2,1],3", () => {
        expect(largestNumber([3,34])).toEqual("343");
    });
    test("[1,2,1,2,1],3", () => {
        expect(largestNumber([3,30,34,5,9])).toEqual("9534330");
    });
    test("[1,2,1,2,1],3", () => {
        expect(largestNumber([111311, 1113])).toEqual("1113111311");
    });
    test("[1,2,1,2,1],3", () => {
        expect(largestNumber([8308,8308,830])).toEqual("83088308830");
    });
});