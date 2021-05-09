/**
 * 617. 合并二叉树
 * 给定两个二叉树，想象当你将它们中的一个覆盖到另一个上时，两个二叉树的一些节点便会重叠。

    你需要将他们合并为一个新的二叉树。合并的规则是如果两个节点重叠，那么将他们的值相加作为节点合并后的新值，否则不为 NULL 的节点将直接作为新二叉树的节点。

    示例 1:

    输入: 
        Tree 1                     Tree 2                  
             1                         2                             
            / \                       / \                            
           3   2                     1   3                        
          /                           \   \                      
         5                             4   7                  
    输出: 
    合并后的树:
             3
            / \
           4   5
          / \   \ 
         5   4   7
    注意: 合并必须从两个树的根节点开始。
*/
/**
 * =============================
 * 二刷
*/
export const mergeTrees = (t1, t2) => {
    if (!t1 && !t2) return null;
    let root = new TreeNode();
    if (t1 && t2) {
        root.val = t1.val + t2.val;
    } else {
        root.val = t1 && t1.val || t2 && t2.val;
    }
    // mergeTrees(t1 && t1.left, t2 && t2.left);
    // mergeTrees(t1 && t1.right, t2 && t2.right);
    // 不能给 t1 ，如果给 t1 了会出现，右子树本来是空，现在被 t2 赋值了，又去处理右子树，就被重复计算了
    // [1,2,null,3]，[1,null,2,null,3] 
    root.left = mergeTrees(t1 && t1.left, t2 && t2.left);
    root.right = mergeTrees(t1 && t1.right, t2 && t2.right);
    return root;
}   

/**
 * =============================
 * 一刷
*/
export const mergeTrees = (t1, t2) => {
    /**
    输入: 
        Tree 1                     Tree 2                  
             1                         2                             
            / \                       / \                            
           3   2                     1   3                        
          /                           \   \                      
         5                             4   7                  
    输出: 
             3
            / \
           4   5
          / \   \ 
         5   4   7
*/
    if (!t1 && !t2) {
        return null;
    }

    let root = {};

    if (t1 && t2) {
        root.val = t1.val + t2.val;
    } else {
        root.val = t1 && t1.val || t2 && t2.val;
    }

    root.left = mergeTrees(t1 && t1.left, t2 && t2.left);
    root.right = mergeTrees(t1 && t1.right, t2 && t2.right);

    return root;
}

// 二刷写下迭代？https://leetcode-cn.com/problems/merge-two-binary-trees/solution/he-bing-er-cha-shu-by-leetcode/