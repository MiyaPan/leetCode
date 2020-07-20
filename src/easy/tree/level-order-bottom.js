/**
 * 107. 二叉树的层次遍历 II
 * 
 * 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

    例如：
    给定二叉树 [3,9,20,null,null,15,7],

     3
    / \
    9  20
      /  \
     15   7
    返回其自底向上的层次遍历为：

    [
    [15,7],
    [9,20],
    [3]
    ]
*/
export const levelOrderBottom = (root) => {
    const result = [];
    let level = -1;

    _levelOrderBottom(root);

    /**
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3     6
    */
    function _levelOrderBottom(node) {
        if (!node) {
            return null;
        }
 
        // 这里把 root 当 0 层处理的，结果要求叶子是 0 层，所以最后要 revert()
        level++;

        node.left && _levelOrderBottom(node.left);
        node.right && _levelOrderBottom(node.right);

        if (result[level] === undefined) {
            result[level] = [];
        }
        // 哪能等于啊！！！等于就把 push 的值 return 了啊，疯了吗
        // if (result[level] === undefined) 也要放值啊，不是等于 []
        // result[level] = result[level].push(node.val);
        result[level].push(node.val);

        level--;
    }

    // 如果是从根到叶子层序遍历，就不用 reverse 了，对应 leetcode 102 题
    return result.reverse();
}

// 解法2：对层序遍历稍加修改，非递归
// 基本的层序是队列里出一个，就把子放进去，改成出一层，一口气放一层，就可以了
export const levelOrderBottom2 = (node) => {
    if (!node) {
        return [];
    }

    let out = _levelOrderBottom2(node);

    // 如果是从根到叶子层序遍历，就不用 reverse 了，对应 leetcode 102 题
    return out.reverse();
    /**
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3     6
    */
   function _levelOrderBottom2(node) {
       if (!node) {
           return null;
       }
   
       let stack = [node];
       let result = [];
       let pointer = 0;
       let level = 0;
       
       while(pointer < stack.length) {
           result[level] = result[level] || [];
           const nodeInNextLevel = [];
   
           while(pointer < stack.length) {
               node = stack[pointer];
               result[level].push(node.val);
               node.left && nodeInNextLevel.push(node.left);
               node.right && nodeInNextLevel.push(node.right);
               pointer++;
           }
   
           // !! concat 不会改变原有数组，而是返回新数组！！！
           stack = stack.concat(nodeInNextLevel);
           level++;
       }
   
       return result;
   }
}
