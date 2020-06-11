/**
import { indexOf } from '../easy/index-of';
 * 889. 根据前序和后序遍历构造二叉树
 * 返回与给定的前序和后序遍历匹配的任何二叉树。
     pre 和 post 遍历中的值是不同的正整数。

    示例：

    输入：pre = [1,2,4,5,3,6,7], post = [4,5,2,6,7,3,1]
    输出：[1,2,3,4,5,6,7]
     

    提示：
    1 <= pre.length == post.length <= 30
    pre[] 和 post[] 都是 1, 2, ..., pre.length 的排列
    每个输入保证至少有一个答案。如果有多个答案，可以返回其中一个。

    链接：https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-postorder-traversal
*/
// 1. 前序遍历中，子树肯定在指定值前面；
// 2. 前序的头和后序的尾，要么是同一个值，就是根了，如果不是同一个，就是两个子树，且前序的为左子，后序的为右子
// 3. 根据 2 可以分左右节点还是根，根据 1 可以瓜分子树是哪些，前序中，节点前面的是它的子树，后面的是后序的节点的子树
// 可以只用前序构建，用后续检查，只需要集中在一个上，不要两个一起判断，乱，且没用
export const constructFromPrePost = (pre, post) => {
    if (pre.length === 0) return null;
    if (pre.length === 1) {
        return {
            val: pre[0],
            left: null,
            right: null
        }
    }

    const root = {
        val: pre.shift()
    };
    const lasePost = post.pop();

    const lastNodeInPost = post[post.length - 1];
    const preDivideIndex = pre.indexOf(lastNodeInPost);
    const firstNodeInPre = pre[0];
    const postDivideIndex = post.indexOf(firstNodeInPre);

    // preDivideIndex = postDivideIndex + 1，因为shift和pop之后，子数组长度得相等啊
    // 下面这个不对，错在 preDivideIndex !== postDivideIndex + 1 的情况：只有一串,没有另一侧子树的情况，post.slice(preDivideIndex)就不对了
    // 只有完全二叉树那种，pre头和post尾不相等的，才是分别两个子树，如果相等的，就得去post里数这个值前面的元素个数，截取pre和post
    // root.left = constructFromPrePost(pre.slice(0, preDivideIndex), post.slice(0, postDivideIndex + 1));
    // root.right = constructFromPrePost(pre.slice(preDivideIndex), post.slice(postDivideIndex + 1));
    // root.left = constructFromPrePost(pre.slice(0, preDivideIndex), post.slice(0, preDivideIndex));
    // root.right = constructFromPrePost(pre.slice(preDivideIndex), post.slice(preDivideIndex));
    
    // 一个串的情况得单独看；或者按照去post里数个数的方式，见答案
    if (preDivideIndex === 0) {
        root.left = constructFromPrePost(pre.slice(0), post.slice(0));
        root.right = constructFromPrePost([], []);
    } else {
        root.left = constructFromPrePost(pre.slice(0, preDivideIndex), post.slice(0, postDivideIndex + 1));
        root.right = constructFromPrePost(pre.slice(preDivideIndex), post.slice(postDivideIndex + 1));
    }
    
    return root;
}
