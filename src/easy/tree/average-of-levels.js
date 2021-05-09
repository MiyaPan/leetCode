/**
 * 637. 二叉树的层平均值
 * 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组.
    输入:
        3
       / \
      9  20
        /  \
       15   7
    输出: [3, 14.5, 11]
    解释:
    第0层的平均值是 3,  第1层是 14.5, 第2层是 11. 因此返回 [3, 14.5, 11].

    注意：节点值的范围在32位有符号整数范围内。
*/
/**
 * =============================
 * 二刷
*/
export const averageOfLevels = (root) => {
    let stack = [root];
    let p = 0;
    let ans = [];
    while ( p < stack.length) {
        let nodesInNextLevel = [];
        let sum = 0;
        let count = 0;
        while ( p < stack.length) {
            let node = stack[p++];
            sum += node.val;
            count++;
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }
        ans.push(sum/count);
        stack = stack.concat(nodesInNextLevel);
    }
    return ans;
}

/**
 * =============================
 * 一刷
*/
export const averageOfLevels = (root) => {
    if (!root) {
        return 0;
    }

    let stack = [root];
    let node = null;
    let pointer = 0;
    let result = [];
    
    while(pointer < stack.length) {
        let nodesInNextLevel = [];
        let count = 0;
        let sum = 0;
        // 层序不会弹出根节点，只会入栈，所以不用 || node，DFS 需要
        while(pointer < stack.length) {
            node = stack[pointer];
            sum += node.val;
            count++;

            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);

            pointer++;
        }

        result.push(sum/count);

        stack = stack.concat(nodesInNextLevel);
    }

    return result;
}

// 用递归栈可以保存层级~~~~，是个好思路，以后用得到，二刷请务必写一下 https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/solution/er-cha-shu-de-ceng-ping-jun-zhi-by-leetcode/
