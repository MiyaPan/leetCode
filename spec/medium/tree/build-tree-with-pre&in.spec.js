// import {deepEqual} from '../../src/utils/object';
// import { buildTree, buildTree2 } from '../../src/middle/build-tree-with-pre&in';
// import { buildTree3} from '../../../src/interviewQuestion/build-tree-105';
import { buildTree4} from '../../../src/ms/medium/buildTreeWithPre&In';
import { levelOrder } from '../../../src/easy/tree/level-order-base';

// describe('buildTree', () => {
//     // test("[3,9,20,15,7],[9,3,15,20,7]  return ", () => {
//     //     expect(JSON.stringify(buildTree([3,9,20,15,7],[9,3,15,20,7]))).toEqual('{"val":3,"left":{"val":9,"left":null,"right":null},"right":{"val":20,"left":{"val":15,"left":null,"right":null},"right":{"val":7,"left":null,"right":null}}}');
//     // });
//     test("[1,2],[2,1]  return ", () => {
//         expect(levelOrder(buildTree3([1,2],[2,1]))).toEqual([1,2]);
//     });
// });

// describe('buildTree2', () => {
//     test("[3,9,20,15,7],[9,3,15,20,7]  return ", () => {
//         expect(JSON.stringify(buildTree2([3,9,20,15,7],[9,3,15,20,7]))).toEqual('{\"val\":3,\"right\":{\"val\":20,\"right\":{\"val\":7,\"right\":null,\"left\":null},\"left\":{\"val\":15,\"right\":null,\"left\":null}},\"left\":{\"val\":9,\"right\":null,\"left\":null}}');
//     });
// });

describe('buildTree4', () => {
    test("[1,2],[2,1]  return ", () => {
        expect(levelOrder(buildTree4([1,2,3],[2,3,1]))).toEqual([1,2,3]);
    });
});
