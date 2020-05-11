// node 节点
function Node(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
}

// right 要传 length，因为是 trunc 的，如果用 index，到倒数第一个倒数第二的时候，再去 createTree 右节点，会直接返回，所以不是 idnex，而是index +1
// const array = [0,1,2,3,4,5,6,7];
// createTree(array, 0, 8);
function createTree(array, left, right) {
    if (left === right) {
        return null;
    }
    const mid = Math.trunc((left + right) / 2);
    return {
        val: array[mid],
        left: createTree(array, left, mid),
        right: createTree(array, mid+1, right)
    }
}

function createTreeByLevelTraseval(arr) {
    if (arr.length === 0) {
        return null;
    }

    let pointer = 1;
    let stackPointer = 0;
    const root = {
        val: arr[0],
        left: null,
        right: null
    };
    let stack = [root];
    let node = null;
    
    while(stackPointer < stack.length && pointer < arr.length) {
        let nodesInCurrentLevel = [];
        while(stackPointer < stack.length && pointer < arr.length) {
            node = stack[stackPointer++];

            let l = arr[pointer++];
            let r = arr[pointer++];
            node.left = l !== null ? {
                val: l,
                left: null,
                right: null
            } : null;
            node.right = r !== null ? {
                val: r || null,
                left: null,
                right: null
            } : null;
    
            node && node.left && nodesInCurrentLevel.push(node.left);
            node && node.right && nodesInCurrentLevel.push(node.right);
        }

        stack = stack.concat(nodesInCurrentLevel);
    }

    return root;
}

export {createTree, createTreeByLevelTraseval}
