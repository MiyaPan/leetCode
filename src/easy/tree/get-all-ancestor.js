/**
 * =============================
 * 二刷，找不到题目了，反正肯定会写，就是调试时间问题
*/
export const getAllAncestor = (node, p) => {

}

/**
 * =============================
 * 一刷
*/
export const getAllAncestor = (node, p) => {
    const result = [];

    _getAllAncestor(node, p);

    return result;

    /**
     *            5
     *        /        \
     *       2          8
     *     /   \       / \
     *    1     4     7   9
     *   /     /     /
     *  0     3     6
    */

    function _getAllAncestor(node, p) {
        if (!node) {
            return false;
        }
    
        if (node === p) {
            // 里面有 0 ，不能 return 0，或者下一个 if 要判断 ！== 0
            return true;
        }
        
        let foundNode = _getAllAncestor(node.left, p) || _getAllAncestor(node.right, p);
    
        if (foundNode) {
            result.push(node.val);
            return true;
        }
    
        return false;
    }
}

