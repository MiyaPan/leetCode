/**
 * 剑指 Offer 37. 序列化二叉树
 * 请实现两个函数，分别用来序列化和反序列化二叉树。

    示例: 
    你可以将以下二叉树：

        1
       / \
      2   3
         / \
        4   5

    序列化为 "[1,2,3,null,null,4,5]"
    注意：本题与主站 297 题相同：https://leetcode-cn.com/problems/serialize-and-deserialize-binary-tree/

    链接：https://leetcode-cn.com/problems/xu-lie-hua-er-cha-shu-lcof
*/
/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    if (!root) return '[]';

    let stack = [root];
    let ans = [root.val];
    let p = 0;
    while (p < stack.length) {
        let node = stack[p++];
        if (node) {
            stack.push(node.left);
            stack.push(node.right);
            ans.push(node.left ? node.left.val : 'null');
            ans.push(node.right ? node.right.val : 'null');
        }
    }
    // 但本题的测试的是 序列化 和 反序列化是否可逆，因此 “序列化列表的形式” 并未限制，只要两个函数可以互逆就好啦
    // 所以这里可以不做，下面反序列的时候也包含 null ，更省事。。
    let i = ans.length-1;
    while (ans[i] === 'null') {
        ans.pop();
        i--;
    }
    return '[' + ans.join(',') + ']';
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
// "[1,2,3,null,null,4,5]"
var deserialize = function(data) {
    let arr = data.substring(1, data.length-1).split(',');
    if (arr.length === 1 && arr[0] === '') return null;

    let root = new TreeNode(arr[0]);
    let stack = [root];
    let p = 0;
    let i = 1;
    while (p < stack.length && i < arr.length) {
        let nodesInNextLevel = [];
        // 不能不限制 i，因为 i++ 越界之后，是 undefined，会继续去 new 节点
        while (p < stack.length && i < arr.length) {
            let node = stack[p++];

            let lVal = arr[i++];
            let l = lVal === 'null' ? null : new TreeNode(lVal);
            node.left = l;
            l && nodesInNextLevel.push(l);

            // 右边节点也要限制，左边节点靠 while 限制了
            if (i < arr.length) {
                let rVal = arr[i++];
                let r = rVal === 'null' ? null : new TreeNode(rVal);
                node.right = r;
                r && nodesInNextLevel.push(r);
            }
        }
        stack = stack.concat(nodesInNextLevel);
    }
    return root;
};
