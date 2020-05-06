/**
 * 145. 二叉树的后序遍历
 * 给定一个二叉树，返回它的 后序 遍历。

    示例:
    输入: [1,null,2,3]  
      1
        \
        2
        /
       3 
    输出: [3,2,1]
    进阶: 递归算法很简单，你可以通过迭代算法完成吗？
*/

export const postorderTraversal = (root) => {
    const result = [];

    _postorderTraversal(root);

    return result;

    function _postorderTraversal(node) {
        if (!node) {
            return [];
        }
        _postorderTraversal(node.left);
        _postorderTraversal(node.right);
        result.push(node.val)

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
/**
 * 思路：向左走到底，然后退栈，退栈的时候如果节点有右子就去遍历右子树，不然那就退栈
 *     【这个时候需要判断节点是否被访问过，用pre不足以判断(从4的分支回退到节点2的时候，)】
 * 
 *  其实还是这个思路，不就是想退栈之前有右子就遍历右子吗，那入栈的时候就把右子入在节点之后就行了。因为退栈左子要先遍历，左子放到右子后入栈就行了。
*/
// export const postorderTraversalIterative = (root) => {
//     const result = [];
//     let stack = [root];
//     let node = root.left;
//     let pre = null;

//     while(stack.length || node) {
//         while(node && pre !== node && !(pre && node.left === pre || pre && node.right === pre)) {
//             stack.push(node);
//             node = node.left;
//         }

//         if (pre && pre === node) {
//             node = stack.pop();
//             node && result.push(node.val);
//             pre = node;
//             node = stack[stack.length - 1];
//             continue;
//         }

//         if (node && node.right && node.right !== pre) {
//             node = node.right;
//         } else {
//             /**
//              *    1
//              *     \
//              *      2
//              *     /
//              *    3
//              * 这种没跑通，1 的右子没机会入栈,while 结束后，node 是null，可以从栈里取一下啊，干嘛死板直接用node
//             */
//            node = stack[stack.length - 1];
//            pre = node;
//         }
//     }
    
//     return result;
// }

    /**
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3     6
    */
// https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/die-dai-jie-fa-shi-jian-fu-za-du-onkong-jian-fu-za/
// https://leetcode-cn.com/problems/binary-tree-postorder-traversal/solution/er-cha-shu-hou-xu-fei-di-gui-bian-li-liang-chong-z/
export const postorderTraversalIterative = (root) => {
    const result = [];
    let stack = [];
    let node = root;
    let pre = null;

    while(stack.length || node) {
        while(node) {
            stack.push(node);
            node = node.left;
        }

        node = stack[stack.length - 1];

        if (node.right !== null && node.right !== pre) {
            node = node.right;
        } else {
            result.push(node.val);
            stack.pop();
            pre = node;

            // 退栈的时候把当前节点置 null，就不会进 while 循环向左了，不用 pre 什么的判断啊！！置 null 就能跳过 while 啊！！不就是想跳过 while 吗
            node = null;
        }
    }
    
    return result;
}
