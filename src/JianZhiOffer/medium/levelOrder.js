/**
 * 剑指 Offer 32 - I. 从上到下打印二叉树
 * https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/
*/
export const levelOrder = (node) => {
    /**
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3     6
    */
    if (!root) {
        return [];
    }

    let stack = [root];
    let result = [];
    let pointer = 0;
    
    while(pointer < stack.length) {
        let node = stack[pointer++];
        result.push(node.val);
        node.left && stack.push(node.left);
        node.right && stack.push(node.right);
    }

    return result;
}