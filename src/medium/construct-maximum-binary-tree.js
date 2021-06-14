
/**
 * 654. 最大二叉树
 * 给定一个不含重复元素的整数数组。一个以此数组构建的最大二叉树定义如下：

    二叉树的根是数组中的最大元素。
    左子树是通过数组中最大值左边部分构造出的最大二叉树。
    右子树是通过数组中最大值右边部分构造出的最大二叉树。
    通过给定的数组构建最大二叉树，并且输出这个树的根节点。
 
    示例 ：

    输入：[3,2,1,6,0,5]
    输出：返回下面这棵树的根节点：

      6
    /   \
   3     5
    \    / 
     2  0   
       \
        1

    提示：
    给定的数组的大小在 [1, 1000] 之间。
*/
/**
 * =============================  
 * 二刷
*/
export const constructMaximumBinaryTree = (nums) => {
    let n = nums.length;
    if (n === 0) return null;
    let idx = 0;
    for (let i = 0; i < n; i++) {
        if (nums[i] > nums[idx]) {
            idx = i;
        }
    }
    let root = new TreeNode(nums[idx]);
    root.left = constructMaximumBinaryTree(nums.slice(0, idx));
    root.right = constructMaximumBinaryTree(nums.slice(idx+1));
    return root;
}









/**
 * =============================  
 * 一刷
*/
export const constructMaximumBinaryTree = (nums) => {
    if (nums.length === 0) {
        return null;
    }

    const max = Math.max(...nums);
    const maxIndex = nums.indexOf(max);
    const root = {
        val: max,
        left: constructMaximumBinaryTree(nums.slice(0, maxIndex)),
        right: constructMaximumBinaryTree(nums.slice(maxIndex+1))
    }

    return root;
}
