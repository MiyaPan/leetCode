
/**
 * 1339. 分裂二叉树的最大乘积
 * https://leetcode-cn.com/problems/maximum-product-of-splitted-binary-tree/
*/
// 思路：每个节点的子树+自己的 sum 可以的 dfs 得到，那成绩就是它 * 剩下的，
// 所以先获得总和，再对每个节点算一个乘积 = 它的子树合 * (综合 - 它的子树合)
// 思路不错，只有一个case没过，超长的
export const maxProduct = (root) => {
    const n = getTotal(root);
    let max = 0;

    function dfs(root) {
        if (!root) return 0;
        const l = dfs(root.left);
        const r = dfs(root.right);
    
        const total = l + r + root.val;
        // Math.max 会导致超长的case爆栈
        max = Math.max(max, total*(n-total));
        // sumList.push(total);

        return l + r + root.val;
    }

    dfs(root);

    return max % (Math.pow(10, 9) +7);
}


function getTotal(root) {
    if (!root) return 0;
    const l = getTotal(root.left);
    const r = getTotal(root.right);

    return l + r + root.val;
}

// 上面 两个 dfs 做的是一样的事，你可能会由于，第一个dfs是要先得到 n 的，那我们在第一个里可以先不计算 max，而是把子树合都存到数组里，
// 最后遍历数组去计算乘积好了
// 这个写法对于超长的 case 就不会爆栈了，奇怪了上面的第一次 dfs 调用完了不会销毁栈吗，到第二次应该没事啊？？
export const maxProduct1 = (root) => {
    let max = 0;
    let sumList = [];
    const n = dfs(root);

    function dfs(root) {
        if (!root) return 0;
        const l = dfs(root.left);
        const r = dfs(root.right);
    
        const total = l + r + root.val;
        // max = Math.max(max, total*(n-total));
        sumList.push(total);

        return l + r + root.val;
    }

    dfs(root);

    sumList.forEach(sum => {
        max = Math.max(max, sum*(n-sum));
    });

    return max % (Math.pow(10, 9) +7);
}
