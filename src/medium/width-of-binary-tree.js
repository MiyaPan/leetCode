
/**
 * 662. 二叉树最大宽度
 * 给定一个二叉树，编写一个函数来获取这个树的最大宽度。树的宽度是所有层中的最大宽度。这个二叉树与满二叉树（full binary tree）结构相同，但一些节点为空。
每一层的宽度被定义为两个端点（该层最左和最右的非空节点，两端点间的null节点也计入长度）之间的长度。

示例 1:
输入: 

           1
         /   \
        3     2
       / \     \  
      5   3     9 

输出: 4
解释: 最大值出现在树的第 3 层，宽度为 4 (5,3,null,9)。

示例 2:
输入: 

          1
         /  
        3    
       / \       
      5   3     

输出: 2
解释: 最大值出现在树的第 3 层，宽度为 2 (5,3)。

示例 3:
输入: 

          1
         / \
        3   2 
       /        
      5      

输出: 2
解释: 最大值出现在树的第 2 层，宽度为 2 (3,2)。

示例 4:
输入: 

          1
         / \
        3   2
       /     \  
      5       9 
     /         \
    6           7
输出: 8
解释: 最大值出现在树的第 4 层，宽度为 8 (6,null,null,null,null,null,null,7)。
注意: 答案在32位有符号整数的表示范围内。
*/
/**
 * =============================
 * 二刷
*/
export  const widthOfBinaryTree = (root) => {
    if (!root) return 0;

    let stack = [{node: root, index: 0}];
    let max = 1;
    let p = 0;
    // let mod = Math.pow(2, 32)-1;
    let mod = Number.MAX_SAFE_INTEGER;
    while(p < stack.length) {
        let nodesInNextLevel = [];
        while(p < stack.length) {
            let {node, index} = stack[p++];
            node.left && nodesInNextLevel.push({node: node.left, index: (index*2+1)%mod});
            node.right && nodesInNextLevel.push({node: node.right, index: (index*2+2)%mod});
        }
        
        let n = nodesInNextLevel.length;
        if (n > 0) {
            // index 可能会变成很大的数，导致失去精度错误，要取模，那应该对谁取模呢，
            // 超过谁出错就对谁取，但是不能在计算的时候取，应该放的时候就取，因为下一步依赖上一步的结果，不取会放的时候直接出错
            let len = nodesInNextLevel[n-1].index - nodesInNextLevel[0].index + 1;
            if (len === 3) {
                console.log(nodesInNextLevel)
                console.log(nodesInNextLevel[n-1].index, nodesInNextLevel[0].index)
            }
            max = Math.max(max, len);
        }
        stack = stack.concat(nodesInNextLevel);
    }
    return max;
}















/**
 * =============================
 * 一刷
*/
// 一个用例没通过，超长，超时了，就是想让你懂完全二叉树的性质规律：每个root的左子树 = pos*2，右子树= pos*2+1
export  const widthOfBinaryTree1 = (root) => {
    if (!root) {
        return 0;
    }

    if (!root.left && !root.right) {
        return 1;
    }

    let stack = [root];
    let pointer = 0;
    let maxWidth = 0;
    let nodesInNextLevel = [];
    
    while(pointer < stack.length) {
        nodesInNextLevel = [];
        while(pointer < stack.length) {
            let node = stack[pointer++];

            nodesInNextLevel.push(node && node.left || null);
            nodesInNextLevel.push(node && node.right || null);
        }
        
        // 全是 null 了
        if (nodesInNextLevel.every(node => !node)) {
            break;
        } else {
            // 不能用 lastIndexOf，因为 null 后面还有数值
            // const lastIndexOfNull = nodesInNextLevel.lastIndexOf(null);
            // const length = lastIndexOfNull === -1 ? nodesInNextLevel.length : lastIndexOfNull;
            let end = 0;
            for (let i = nodesInNextLevel.length - 1; i >= 0; i--) {
                if (nodesInNextLevel[i] !== null) {
                    end = i;
                    break;
                }
            }
            let start = 0;
            for (let i =  0; i < nodesInNextLevel.length; i++) {
                if (nodesInNextLevel[i] !== null) {
                    start = i;
                    break;
                }
            }
            let length = end - start + 1;
            maxWidth = Math.max(maxWidth, length);
            stack = stack.concat(nodesInNextLevel);
        }
    }

    return maxWidth;
}

export  const widthOfBinaryTree11 = (root) => {
    if (!root) {
        return 0;
    }

    if (!root.left && !root.right) {
        return 1;
    }

    let stack = [{node: root, pos: 0}];
    let pointer = 0;
    // 跳过上面两个return，长度至少为1，不能为0是因为可能有单枝一直向下的，一直不回进maxwidth判断，所以给1
    let maxWidth = 1;
    let nodesInNextLevel = [];
    
    while(pointer < stack.length) {
        nodesInNextLevel = [];
        while(pointer < stack.length) {
            let cur = stack[pointer++];

            cur.node.left && nodesInNextLevel.push({node: cur.node.left, pos: cur.pos * 2});
            cur.node.right && nodesInNextLevel.push({node: cur.node.right, pos: cur.pos * 2 + 1});
        }

        if (nodesInNextLevel.length > 1) {
            const len = nodesInNextLevel[nodesInNextLevel.length - 1].pos - nodesInNextLevel[0].pos + 1;
            maxWidth = Math.max(maxWidth, len);
        }
        stack = stack.concat(nodesInNextLevel);
    }

    return maxWidth;
}
