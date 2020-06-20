import {levelOrder} from '../../src/middle/n-tree-level-order';

describe('levelOrder', () => {
    const tree = {
        val: 1,
        children: [
            {
                val: 3,
                children: [
                    {
                        val: 5,
                        children: null
                    },
                    {
                        val: 6,
                        children: null
                    }
                ]
            },
            {
                val: 2,
                children: null
            },
            {
                val: 4,
                children: null
            }
        ]
    };

    /**
     *            1
     *        /   |    \
     *       3    2     4
     *     /   \      
     *    5     6    
    */

    test("tree return", () => {
        expect(levelOrder(tree)).toEqual([[1],[3,2,4],[5,6]]);
    });
});