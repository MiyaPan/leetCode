/**
 * 1457. 二叉树中的伪回文路径
 * https://leetcode-cn.com/problems/pseudo-palindromic-paths-in-a-binary-tree/
*/
// 这个会报内部错误，不明，应该是 isPsedo 写法的事，答案用二进制数检查是不是回文，厉害
// 题目说值只有 1-9 就是提示，这个条件不用就不是最佳答案
// 解法 2 通过了，说明就 map 不行呗
export const pseudoPalindromicPaths = (root) => {
    if (!root) return 0;
    let count = 0;
    function dfs(root, path) {
        path.push(root.val);

        if (!root.left && !root.right) {
            if (isPsedo(path)) count++;
            return;
        }

        root.left && dfs(root.left, path);
        root.right && dfs(root.right, path);
        path.pop(root.val);
    }
    dfs(root, []);
    return count; 
}


// 回文序列中只能有一个值存在奇数个，其他节点必须是偶数个
function isPsedo(arr) {
    let map = new Map();
    for (let i = 0; i< arr.length; i++) {
        if (map.has(arr[i])) map.set(arr[i], map.get(arr[i]) + 1)
        else map.set(arr[i], 1)
    }

    let singleValues = Array.from(map.values()).filter(count => count%2 === 1);

    return singleValues.length === 1;
}

// 利用 1-9 ,要熟练把路径状态在递归中传下去，而不是声明全区变量，先 push 再 pop，前者优先，实在不行才后者
export const pseudoPalindromicPaths1 = (root) => {
    if (!root) return 0;

    let count = 0;
    function dfs(root, valueMap) {
        if (valueMap[root.val]) valueMap[root.val]++;
        else valueMap[root.val] = 1;

        if (!root.left && !root.right) {
            if (isPsedo1(valueMap)) count++;
            valueMap[root.val]--;
            return;
        }

        root.left && dfs(root.left, valueMap);
        root.right && dfs(root.right, valueMap);

        valueMap[root.val]--;
    }

    dfs(root, {});
    return count; 
}

function isPsedo1(obj) {
    let count = 0
    for (let i = 1; i< 10; i++){
        if (obj[i]%2 === 1) count++;
    }
    return count <= 1;
}

// 优秀解法：用二进制数记录个数
// https://leetcode-cn.com/problems/pseudo-palindromic-paths-in-a-binary-tree/solution/java-dfs-shuang-bai-by-rational-irrationality/
// 因为我们要的并不是路径中某些几点的具体个数，计数就明显多于了，我们要的只是节点个数的奇偶性
// 二进制数的异或正好表达就行，从个位开始依次记录 1-9 的元素的奇偶性
// 比如根节点是 2，此时有一个 2， temp初始值是 000000000，首先 1个就是 1<1 = 000000001,然后这个值和temp 取异或就可以
export const pseudoPalindromicPaths2 = (root) => {
    if (!root) return 0;

    let count = 0;
    function dfs(root, temp) {
        // 位运算优先级低
        // temp ^= 1<<root.val;
        temp ^= (1<<root.val);
        if (!root.left && !root.right) {
            // 难点2：怎么输出二进制数中 1 的个数，当然不能转字符串了，数学计算多块：& 111111111 取就行
            // https://www.cnblogs.com/graphics/archive/2010/06/21/1752421.html
            // 与 1 与，有几个 1 就是取后面几位里是 1 的值，前面的都是 0 ，舍去了
            // temp & (temp-1) 是去掉 temp 中的最后一个 1，而不是最后一位！只有去掉(最后一个 1)[0100中最后一个 1 是 4 那个] 是 0，就是只有 1 个 1
            if (temp === 0 || (temp & (temp-1)) ===0) count++;
            return;
        }

        root.left && dfs(root.left, temp);
        root.right && dfs(root.right, temp);
    }

    dfs(root, 0);
    return count; 
}