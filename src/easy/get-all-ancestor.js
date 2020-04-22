
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

