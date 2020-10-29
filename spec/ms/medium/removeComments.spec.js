import { removeComments } from '../../../src/ms/medium/removeComments';

describe('removeComments', () => {
    test("701", () => {
        expect(removeComments([
            "/*Test program */", 
            "int main()", "{ ", 
            "  // variable declaration ", 
            "int a, b, c;", 
            "/* This is a test", 
            "   multiline  ", 
            "   comment for ", 
            "   testing */", 
            "a = b + c;", 
            "}"
        ])).toEqual(["int main()","{ ","  ","int a, b, c;","a = b + c;","}"]);
    });
    test("701", () => {
        expect(removeComments([
            "a/*comment", 
            "line", 
            "more_comment*/b"
        ])).toEqual(["ab"]);
    });
});