/**
 * 95. 不同的二叉搜索树 II
 * 给你一个整数 n ，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。可以按 任意顺序 返回答案。

    示例 1：
    输入：n = 3
    输出：[[1,null,2,null,3],[1,null,3,2],[2,1,3],[3,1,null,null,2],[3,2,null,1]]
    
    示例 2：
    输入：n = 1
    输出：[[1]]
     
    提示：
    1 <= n <= 8
    链接：https://leetcode-cn.com/problems/unique-binary-search-trees-ii
*/
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
export const generateTrees = (n) => {
    return generate(1, n);
}
function generate(start, end)  {
    if (start === end) return [new TreeNode(start)];
    if (start > end) return [null];
    let trees = [];
    for (let i = start; i <= end; i++) {
        let lefts = generate(start, i-1);
        let rights = generate(i+1, end);
        for (l of lefts) {
            for (r of rights) {
                let root = new TreeNode(i);
                root.left = l;
                root.right = r;
                trees.push(root);
            }
        }
    }
    return trees;
}








/**
 * =============================
 * 一刷
*/
// 思路：搜素二叉树的性质就是：左子树比根小，右子树比根大。所以我们枚举每个节点 i 当做根，那么 [0...i-1] 必然为左子(因为根定了啊，不可能去右边的)，
// [i+1, ...n] 为右子，然后排列组合左右子即可。左右子通过一样的逻辑获得。
// 唉，不让优化就不用加备忘，怪麻烦的
export const generateTrees = (n) => {
    if (n === 0) return [];
    return helper(1, n);
}

function helper(start, end) {
    if (start > end) return [null];
    if (start === end) return [new TreeNode(start)];

    let ans = [];

    for (let i = start; i <= end; i++) {
        let left = helper(start, i-1);
        let right = helper(i+1, end);
        // 是每个 l 和 r 的排列都生成一个 root 呢，不是这里呢
        // let root = new TreeNode(i);
        for (let l of left) {
            for (let r of right) {
                let root = new TreeNode(i);
                root.left = l;
                root.right = r;
                ans.push(root);
            }
        }
    }
    return ans;
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

export const generateTrees1 = (n) => {
    if (n === 0) return [];
    return helper(1, n);
}

function helper(start, end) {
    // 空数组会使 以 1 为根时，左子树为空，进不来排列组合的循环，所以要放个null！！
    // if (start > end) return [];
    if (start > end) return [null];
    if (start === end) return [new TreeNode(start)];
    
    let result = [];
    for (let i = start; i <= end; i++) {
        // 得到的是所有可能的左子树
        let leftTrees = helper(start, i-1);
        // 得到的是所有可能的右子树，要排列组合
        let rightTrees = helper(i+1, end);
        
        for (let left of leftTrees) {
            for (let right of rightTrees) {
                let root = new TreeNode(i);
                root.left = left;
                root.right = right;
                result.push(root);
            }
        }
    }

    return result;
}