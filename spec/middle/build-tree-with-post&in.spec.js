import { buildTree, buildTree2 } from '../../src/middle/build-tree-with-post&in';

describe('buildTree', () => {
    test("[9,3,15,20,7], [9,15,7,20,3]  return ", () => {
        expect(buildTree([9,3,15,20,7], [9,15,7,20,3])).toEqual([3,9,20,15,7]);
    });
});
