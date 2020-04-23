// import {deepEqual} from '../../src/utils/object';
import { buildTree, buildTree2 } from '../../src/middle/build-tree-with-pre&in';

describe('buildTree', () => {
    test("[3,9,20,15,7],[9,3,15,20,7]  return ", () => {
        expect(JSON.stringify(buildTree([3,9,20,15,7],[9,3,15,20,7]))).toEqual('{"val":3,"left":{"val":9,"left":null,"right":null},"right":{"val":20,"left":{"val":15,"left":null,"right":null},"right":{"val":7,"left":null,"right":null}}}');
    });
});

describe('buildTree2', () => {
    test("[3,9,20,15,7],[9,3,15,20,7]  return ", () => {
        debugger
        expect(JSON.stringify(buildTree2([3,9,20,15,7],[9,3,15,20,7]))).toEqual('{\"val\":3,\"right\":{\"val\":20,\"right\":{\"val\":7,\"right\":null,\"left\":null},\"left\":{\"val\":15,\"right\":null,\"left\":null}},\"left\":{\"val\":9,\"right\":null,\"left\":null}}');
    });
});
