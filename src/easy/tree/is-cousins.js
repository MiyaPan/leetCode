/**
 * 993. 二叉树的堂兄弟节点
 * 在二叉树中，根节点位于深度 0 处，每个深度为 k 的节点的子节点位于深度 k+1 处。
    如果二叉树的两个节点深度相同，但父节点不同，则它们是一对堂兄弟节点。
    我们给出了具有唯一值的二叉树的根节点 root，以及树中两个不同节点的值 x 和 y。
    只有与值 x 和 y 对应的节点是堂兄弟节点时，才返回 true。否则，返回 false。

    示例 1：
    输入：root = [1,2,3,4], x = 4, y = 3
    输出：false

    示例 2：
    输入：root = [1,2,3,null,4,null,5], x = 5, y = 4
    输出：true

    示例 3：
    输入：root = [1,2,3,null,4], x = 2, y = 3
    输出：false
     
    提示：
    二叉树的节点数介于 2 到 100 之间。每个节点的值都是唯一的、范围为 1 到 100 的整数。
*/
/**
 * =============================
 * 二刷
*/
export const isCousins = (root, x, y) => {
    let stack = [root];
    let p = 0;
    let parent = [];
    while (p < stack.length) {
        let nodesInNextLevel = [];
        // 还得限制在同一层
        parent = [];
        while (p < stack.length) {
            let node = stack[p++];
            if (node.left && (node.left.val === x || node.left.val === y)) {
                parent.push(node);
            }
            if (node.right && (node.right.val === x || node.right.val === y)) {
                parent.push(node);
            }
            if (parent.length === 2) {
                return parent[0] !== parent[1];
            }
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
        }
        stack = stack.concat(nodesInNextLevel);
    }
    return false;
}

/**
 * =============================
 * 一刷
*/
export const isCousins = (root, x, y) => {
    let stack = [root];
    let node = null;
    let pointer = 0;
    let count = 0;
    
    while(pointer < stack.length) {
        let nodesInNextLevel = [];
        count = 0;
        while(pointer < stack.length) {
            node = stack[pointer];
            // 父节点不同才是堂兄弟，前提是具有唯一值的树，说了

            // 下面的 isLeft 和 isRight 逻辑更简洁，都能通，这里的更直白
            // if (node.left && node.right
            //     && (node.left.val === x && node.right.val === y
            //         || node.right.val === x && node.left.val === y)) {
            //     return false;
            // }

            // if (node.left && (node.left.val === x || node.left.val === y)
            //     || node.right && (node.right.val === x || node.right.val === y)) {
            //     count++;
            // }

            let isLeft = node.left && (node.left.val === x || node.left.val === y);
            let isRight = node.right && (node.right.val === x || node.right.val === y);

            if (isLeft && isRight) {
                return false;
            }

            if (isLeft || isRight) {
                count++;
            }

            if (count === 2) {
                return true;
            }
            
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);

            pointer++;
        }

        stack = stack.concat(nodesInNextLevel);
    }

    return count === 2;
}

// DFS 也行，就记录 深度 的同时，记录下 父节点，最后判断 https://leetcode-cn.com/problems/cousins-in-binary-tree/solution/er-cha-shu-de-tang-xiong-di-jie-dian-by-leetcode/
