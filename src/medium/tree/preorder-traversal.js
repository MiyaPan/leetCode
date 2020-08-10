/**
 * 144. 二叉树的前序遍历
 * 给定一个二叉树，返回它的 前序 遍历。
 * 
    示例:
    输入: [1,null,2,3]  
       1
        \
         2
        /
       3 
    输出: [1,2,3]
*/
export const preorderTraversal = (root) => {
    const result = [];

    _preorderTraversal(root);

    return result;

    function _preorderTraversal(node) {
        if(!node) {
            return [];
        }
        result.push(node.val);
        node.left && _preorderTraversal(node.left);
        node.right && _preorderTraversal(node.right);
    }
}

    /**
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3     6
    */
export const preorderTraversalIterative = (root) => {
    if (!root) {
        return [];
    }

    let result = [root.val];
    let stack = [root];
    let node = root.left;

    while (stack.length || node) {
        while(node) {
            result.push(node.val);
            stack.push(node);
            node = node.left;
        }

        node = stack.pop();
        node = node.right;
    }

    return result;
}
