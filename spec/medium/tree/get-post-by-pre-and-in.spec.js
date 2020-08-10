import { getPostByPreAndIn } from '../../src/middle/get-post-by-pre-and-in';

describe('getPostByPreAndIn', () => {
    test("[1,2,4,7,3,5,8,9,6],[4,7,2,1,8,5,9,3,6]  return [7,4,2,8,9,5,6,3,1]", () => {
        expect(getPostByPreAndIn([1,2,4,7,3,5,8,9,6],[4,7,2,1,8,5,9,3,6])).toEqual([7,4,2,8,9,5,6,3,1]);
    });
});
