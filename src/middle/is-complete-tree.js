/**
 * 958. 二叉树的完全性检验
 * 
 * 给定一个二叉树，确定它是否是一个完全二叉树。
    百度百科中对完全二叉树的定义如下：
    若设二叉树的深度为 h，除第 h 层外，其它各层 (1～h-1) 的结点数都达到最大个数，第 h 层所有的结点都连续集中在最左边，这就是完全二叉树。（注：第 h 层可能包含 1~ 2h 个节点。）

      1
    /   \
   2     3
  / \   /
 4   5 6
 最后一层前的每一层都是满的（即，结点值为 {1} 和 {2,3} 的两层），且最后一层中的所有结点（{4,5,6}）都尽可能地向左。
*/

// 这种没法判断下面这种树，2节点会返回 true，但是没发感知到父节点的父节点还有值，所以 DFS 还是不行，得 BFS
/**
 *    1
    /   \
   2     3
  /     / \
 4     6   5
*/
// export const isCompleteTree = (root) => {
//     if (!root) {
//         return false;
//     }

//     if (root.left ===null && root.right !== null) {
//         return false;
//     }

//     if (root.left === null && root.right === null) {
//         return true;
//     }

//     if (root.left !==null && root.right === null && root.left.left === null && root.left.right === null) {
//         return true;
//     }

//     let flag = isCompleteTree(root.left);
//     flag = flag && isCompleteTree(root.right);

//     return flag;
// }

/**
 * 思路：
 * 1. 只要碰到(叶子节点 或者 有左子没右子的节点)，BFS下后续节点(包含同层的后续 和 下一层的后续节点)就不能有子节点了
 * 2. 碰到没左子有右子的肯定不是
 * 这两个可以卡死一个完全树了，但是更好的思路是：把 null 节点也放进去，null 后面不能有就行了，就是 1 和 2 的综合了
*/
export const isCompleteTree = (root) => {
    if (!root) {
        return false;
    }

    let stack = [root];
    let nodesInNextLevel = [];
    let level = 0;
    let pointer = 0;
    let nextNodeShouldNotHaveChildren = false;

    while(pointer < stack.length) {
        nodesInNextLevel = [];
        while(pointer < stack.length) {
            let node = stack[pointer];
            if (nextNodeShouldNotHaveChildren && (node.left || node.right)) {
                return false;
            }
            node.left && nodesInNextLevel.push(node.left);
            node.right && nodesInNextLevel.push(node.right);
            if (!node.left && node.right) {
                return false;
            }
            /**
             *     1            1                1
             *   /   \        /   \            /   \
             *  2     3      2     3          2     3
             * /                  /  \       /     /  \
             * 5                  5   6     4      5   6
            */
           // 有左子没右子或者碰到叶子节点，后续节点不能有孩子
            if ((node.left && !node.right) || !node.left && !node.right) {
                nextNodeShouldNotHaveChildren = true;
            }
            pointer++;
        }

        stack = stack.concat(nodesInNextLevel);
        level++;
    }

    return true;
}

// 如果把 null 节点放到栈里，会简单很多，只要出现过 null，后续就不能有节点，而不用判断子啊孙啊的了，
// ** 所以把 null 也放进队列或栈有时是很管用的，根据题目判断要不要放 **
export const isCompleteTree2 = (root) => {
    if (!root) {
        return false;
    }

    let stack = [root];
    let pointer = 0;
    let nextNodeShouldBeNull = false;

    /**
     *     1            1                1
     *   /   \        /   \            /   \
     *  2     3      2     3          2     3
     * /                  /  \       /     /  \
     * 5                  5   6     4      5   6
    */
    while(pointer < stack.length) {
        // 因为 push 的时候没判空，null 也进去了，所以 node 可能是 null，傻不傻
        let node = stack[pointer];
        if (node !== null) {
            if (nextNodeShouldBeNull) {
                return false;
            }
            stack.push(node.left);
            stack.push(node.right);
        }

        if (!node) {
            nextNodeShouldBeNull = true;
        }
        pointer++;
    }

    return true;
}
