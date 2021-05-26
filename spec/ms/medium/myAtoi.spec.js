import { myAtoi } from '../../../src/ms/medium/myAtoi';

describe('myAtoi', () => {
    // test("701", () => {
    //     expect(myAtoi('a', 'c', ['a', 'b', 'c'])).toEqual(2);
    // });
    // test("701", () => { 
    //     expect(myAtoi('hit', 'cog', ["hot","dot","dog","lot","log","cog"])).toEqual(5);
    // });
    // test("701", () => {
    //     expect(myAtoi("hot","dot",["hot","dot","dog"])).toEqual(2);
    // });
    // test("fighting", () => {
    //     expect(myAtoi("   -42")).toEqual(-42);
    // });
    test("fighting", () => {
        expect(myAtoi("-91283472332")).toEqual(-2147483648);
    });
});