/**
 * =============================
 * 二刷，done
*/
export const levelOrder = (node) => {
    /**
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3     6
    */
    if (!node) {
        return null;
    }

    let stack = [node];
    let result = [];
    let pointer = 0;
    
    while(pointer < stack.length) {
        node = stack[pointer];
        result.push(node.val);
        // 层序遍历不用先放 右子呀呀呀
        node.left && stack.push(node.left);
        node.right && stack.push(node.right);

        pointer++;
    }

    return result;
}