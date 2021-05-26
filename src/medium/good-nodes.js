/**
 * 1448. 统计二叉树中好节点的数目
 * https://leetcode-cn.com/problems/count-good-nodes-in-binary-tree/
*/
export const goodNodes = (root) => {
    let max = Number.MIN_SAFE_INTEGER;
    let count = 0;

    function dfs(root) {
        if (!root) return;

        let preMax = max;
         
        if (root.val >= max) {
            count++;
            max = root.val;
        }

        dfs(root.left);
        dfs(root.right);
        // 每次出栈，都把 max 置为父节点那时候的max,保证每条路径间不相互影响
        // 效果跟把 max 每次递归都传下去一样~~传下去就不用入栈存 preMax，出栈再 "pop" max了
        max = preMax;
    }
    dfs(root);

    return count;
}
