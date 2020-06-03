/**
 * 199. 二叉树的右视图
 * 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

    示例:

    输入: [1,2,3,null,5,null,4]
    输出: [1, 3, 4]
    解释:

      1            <---
    /   \
   2     3         <---
    \     \
     5     4       <---
*/
export const rightSideView = (root) => {
    if (!root) {
        return [];
    }

    let stack = [root];
    let pointer = 0;
    let result = [root.val];
    
    while(pointer < stack.length) {
        let nodesInCurrentLevel = [];

        while(pointer < stack.length) {
            let node = stack[pointer++];
            node.left && nodesInCurrentLevel.push(node.left);
            node.right && nodesInCurrentLevel.push(node.right);
        }

        // 最后一层叶子节点时，nodesInCurrentLevel 为空，所以要判断
        const last = nodesInCurrentLevel[nodesInCurrentLevel.length - 1];
        last && result.push(last.val);
        stack = stack.concat(nodesInCurrentLevel);
    }

    return result;
}

// DFS 也可以，递归，每层最后访问的你不知道，但是每层第一个是知道的，所以递归先访问右子树就行
export const rightSideViewDFS = (root) => {
    if (!root) {
        return [];
    }

    let result = [];

    dfs(root, 0, result);

    return result;
}

function dfs(node, depth) {
    if (!node) {
        return ;
    }

    // depth 是数组期望的下一个，就是每层的第一个，也就是说，数组可帮我们记录
    // 另一种理解：如果层数超过现有的元素量，代表要记录节点到对应的位置了
    if (depth === result.length) {
        result.push(node.val);
    }

    dfs(node.right, depth+1);
    dfs(node.left, depth+1);
}
