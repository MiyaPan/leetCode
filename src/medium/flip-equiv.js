/**
 * 951. 翻转等价二叉树
 * 我们可以为二叉树 T 定义一个翻转操作，如下所示：选择任意节点，然后交换它的左子树和右子树。
    只要经过一定次数的翻转操作后，能使 X 等于 Y，我们就称二叉树 X 翻转等价于二叉树 Y。
    编写一个判断两个二叉树是否是翻转等价的函数。这些树由根节点 root1 和 root2 给出。

    示例：
    输入：root1 = [1,2,3,4,5,6,null,null,null,7,8], root2 = [1,3,2,null,6,4,5,null,null,null,null,8,7]
    输出：true
    解释：我们翻转值为 1，3 以及 5 的三个节点。

    提示：
    每棵树最多有 100 个节点。
    每棵树中的每个值都是唯一的、在 [0, 99] 范围内的整数。

    链接：https://leetcode-cn.com/problems/flip-equivalent-binary-trees
*/
// TODO: 三刷，思路简单，但是要写下，细节你写不对
/**
 * =============================
 * 二刷
*/
export const flipEquiv = (root1, root2) => {
    if (!root1 && !root2) return true;
    if (!root1 || !root2) return false;
    if (root1.val !== root2.val) return false;

    if ((root1.left && root1.left.val) === (root2.left && root2.left.val)) {
        return flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right);;
    } else {
        return flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left);
    }
}

const aaa = 1;
export default aaa;







/**
 * =============================
 * 1刷
*/
export const flipEquiv1 = (root1, root2) => {
    if (!root1 && !root2) return true;
    if (!root1 || !root2 || root1.val !== root2.val) return false;

    // const isLeftEuq = !root1.left && !root2.left || (root1.left && root1.left.val) === (root2.left && root2.left.val);
    // const isRightEuq = !root1.right && !root2.right || (root1.right && root1.right.val) === (root2.right && root2.right.val);
    // const isLeftEuqRight = !root1.left && !root2.right || (root1.left && root1.left.val) === (root2.right && root2.right.val);
    // const isRightEuqLeft = !root1.right && !root2.left || (root1.right && root1.right.val) === (root2.left && root2.left.val);

    // if (isLeftEuq && isRightEuq) {
    //     // let r1 = flipEquiv(root1.left, root2.left);
    //     // let r2 = r1 ? flipEquiv(root1.right, root2.right) : false;
    //     // return r1 && r2;
    //     // 上面写法傻了吗
    //     return flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right);
    // }
    // if (isLeftEuqRight && isRightEuqLeft) {
    //     return flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left);
    // }

    // return false;

    // 无非就是 左左右右 || 左右右左，所以直接简写好了，看答案
    return flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right)
        || flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left); 
}


function flipEquiv2(root1, root2) {
    // 为什么可以这么写：可读性是差，但是如果两个对象就想等了，就不用往下了，少一点，null == null呀，叶节点都适用的
    if (root1 == root2)
            return true;
    if (root1 == null || root2 == null || root1.val != root2.val)
        return false;

    return (flipEquiv(root1.left, root2.left) && flipEquiv(root1.right, root2.right) ||
            flipEquiv(root1.left, root2.right) && flipEquiv(root1.right, root2.left));
}
