/**
 * 331. 验证二叉树的前序序列化
 * 序列化二叉树的一种方法是使用前序遍历。当我们遇到一个非空节点时，我们可以记录下这个节点的值。如果它是一个空节点，我们可以使用一个标记值记录，例如 #。

     _9_
    /   \
   3     2
  / \   / \
 4   1  #  6
/ \ / \   / \
# # # #   # #
    例如，上面的二叉树可以被序列化为字符串 "9,3,4,#,#,1,#,#,2,#,6,#,#"，其中 # 代表一个空节点。

    给定一串以逗号分隔的序列，验证它是否是正确的二叉树的前序序列化。编写一个在不重构树的条件下的可行算法。
    每个以逗号分隔的字符或为一个整数或为一个表示 null 指针的 '#' 。
    你可以认为输入格式总是有效的，例如它永远不会包含两个连续的逗号，比如 "1,,3" 。

    示例 1:

    输入: "9,3,4,#,#,1,#,#,2,#,6,#,#"
    输出: true
    示例 2:

    输入: "1,#"
    输出: false
    示例 3:

    输入: "9,#,#,1"
    输出: false
*/

/**
 * @param {string} preorder
 * @return {boolean}
 */
export const isValidSerialization = (preorder) => {
    const arr = preorder.split(',');

    // 只有一个 null 是对的，只有数字就错了，因为数字要有孩子
    if (arr.length === 1 && arr[0] === '#') {
        return true;
    }
    // 小于 3 的 root 没右子，注意：右子是 null 的时候也需要 #
    if (arr.length < 3) {
        return false;
    }

    let node = {};
    let stack = [];
    let pointer = 0;
    // "9,3,4,#,#,1,#,#,2,#,6,#,#"
    while(pointer < arr.length) {
        let value = arr[pointer++];

        if (value !== '#') {
            node.val = value;
            node.left = {};
            node.right = {};

            stack.push(node);
            node = node.left;
        } else {
            node = stack.pop();
            if (node) {
                node = node.right;
            } else {
                if (pointer !== arr.length) {
                    return false;
                }
            }
        }
    }

    // 数组跑完了，但是栈里还有节点，就说明有节点还没放右子，就false了
    if (stack.length) {
        return false;
    }

    return true;
}

// https://leetcode-cn.com/problems/verify-preorder-serialization-of-a-binary-tree/solution/yan-zheng-er-cha-shu-de-qian-xu-xu-lie-hua-by-leet/
//官方解法，很秒，只数需要的坑位就行，不用管节点是否连接
// 思路: 如果当前字符是 # 就消耗一个坑位，如果不是 #，消耗掉一个坑位，还要增加两个坑位
// 最后看需要的坑位总数，大于 0 就是不够，false，小于 0 就是null节点多了，初始需要 1个，给根节点用
export const isValidSerialization1 = (preorder) => {
    const arr = preorder.split(',');

    let pointer = 0;
    let slot = 1;
    while(pointer < arr.length) {
        // 这样写，当字符串为 #,1,1,1,#,#,# 时不行，因为当不为 # 时，
        // 直接加了 1，而不是先减 1，这里有case slot已经< 0 了，直接加一跳过了这个判断，不能图省事
        // if (arr[pointer] === '#') {
        //     slot--;

        //     // 特别注意！过程中坑位不够就要跳出，因为，可能为负值，之后有加回去，导致正好等于 0，
        //     // 减完就要判断，不能在 if else 之后，那就进到下一个循环了，就又可能加回来了
        //     if (slot < 0) {
        //         return false;
        //     }
        // } else {
        //     // 减掉自己占的，再加两个孩子的坑位，就是加 1
        //     slot ++;
        // }

        slot--;

        if (slot < 0) return false;

        if (arr[pointer] !== '#') slot += 2;
        
        pointer++;
    }

    return slot === 0;
}
