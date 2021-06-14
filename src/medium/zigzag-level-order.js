/**
 * 103. 二叉树的锯齿形层次遍历
 * 给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

    例如：
    给定二叉树 [3,9,20,null,null,15,7],

     3
    / \
    9  20
      /  \
     15   7
    返回锯齿形层次遍历如下：

    [
    [3],
    [20,9],
    [15,7]
    ]

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/binary-tree-zigzag-level-order-traversal
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
// 二刷，done
// 也是BFS和DFS两种：
/**
 * BFS：深度遍历，用递归，每递归一层，level++，从左到右的遍历，会把元素挨个放到result[level]中
 * DFS：层序遍历改写，每次一口气弹出一层，一口气把下一层全放到队列里，而不是一个元素一个元素的加，然后逆转奇数层的数组，就可以了
 * 下面默写 DFS：
*/
export const zigzagLevelOrder = (root) => {
    if (!root) {
        return [];
    }

    let stack = [root];
    let result = [];
    let level = 0;
    let pointer = 0;

    while(pointer < stack.length) {
        // 每次进入下一次，先初始化 result[level]
        result[level] = result[level] || [];
        const nodeInNextLevel = [];
        const reverseNodes = [];
    /**
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3    
    */
        while(pointer < stack.length) {
            const node = stack[pointer];
            if (level%2 === 1) {
                reverseNodes.push(node.val);
            } else {
                result[level].push(node.val);
            }
            
            node.left && nodeInNextLevel.push(node.left);
            node.right && nodeInNextLevel.push(node.right);
            pointer++;
        }

        if (level%2 === 1) {
            reverseNodes.reverse();
            result[level] = result[level].concat(reverseNodes);
        }

        stack = stack.concat(nodeInNextLevel);
        level++;
    }

    return result;
}
