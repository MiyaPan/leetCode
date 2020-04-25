/**
 * 429. N叉树的层序遍历
 * 
 * 给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。
 *            1
 *        /   |    \
 *       3    2     4
 *     /   \      
 *    5     6    
 * 返回其层序遍历:
    [
        [1],
        [3,2,4],
        [5,6]
    ]
    说明:树的深度不会超过 1000。树的节点总数不会超过 5000。
 */

 /**
  * const tree = {
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
 */

 /**
 *            1
 *        /   |    \
 *       3    2     4
 *     /   \      
 *    5     6    
 */
 export const levelOrder = (root) => {
     if (!root) {
         return [];
     }

     let stack = [root];
     let result = [];
     let level = 0;
     let pointer = 0;

     while(pointer < stack.length) {
        result[level] = result[level] || [];
        let nodesInNextLevel = [];

        while(pointer < stack.length) {
            const node = stack[pointer];
            result[level].push(node.val);
            // concat 不修改原数组，要用返回值啊啊啊啊！！！2次了！！！
            // node.children && nodesInNextLevel.concat(node.children);
            // [1].concat(null) 竟然返回 [1, null]！！！
            if (node.children) {
                nodesInNextLevel = nodesInNextLevel.concat(node.children);
            }
            pointer++;
        }
        stack = stack.concat(nodesInNextLevel);
        level++;
     }

     return result;
 }
