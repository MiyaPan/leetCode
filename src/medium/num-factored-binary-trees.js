/**
 * 823. 带因子的二叉树
 * 给出一个含有不重复整数元素的数组，每个整数均大于 1。
    我们用这些整数来构建二叉树，每个整数可以使用任意次数。
    其中：每个非叶结点的值应等于它的两个子结点的值的乘积。

    满足条件的二叉树一共有多少个？返回的结果应模除 10 ** 9 + 7。

    示例 1:

    输入: A = [2, 4]
    输出: 3
    解释: 我们可以得到这些二叉树: [2], [4], [4, 2, 2]
    示例 2:

    输入: A = [2, 4, 5, 10]
    输出: 7
    解释: 我们可以得到这些二叉树: [2], [4], [5], [10], [4, 2, 2], [10, 2, 5], [10, 5, 2].

    提示:
    1 <= A.length <= 1000.
    2 <= A[i] <= 10 ^ 9.

    https://leetcode-cn.com/problems/binary-trees-with-factors/
*/
export const numFactoredBinaryTrees = (A) => {
    A.sort((a,b) => a-b);

    let sum = 1;
    let root = 0;
    // 都得填充 1，不然 像 5 这个，它是没办法右子树，但他可以做10 的子树，这个时候要用它的 1 来乘以的
    let stack = Array(A.length).fill(1);
    // [2,4,5,10]
    for (let i = 1; i< A.length; i++) {
        root = A[i];
        // 不能从0，得是1 ，它本身就算一个了啊
        let total = 1;
        for (let j = i -1; j>=0; j--) {
            if (root % A[j] === 0) {
                let factor = root/A[j];
                let factorIndex = A.indexOf(factor);
                if (A.includes(factor)) {
                    // 不相同的都会遍历到，不用乘以 2
                    total += stack[j] * stack[factorIndex];
                }
            }
        }
        stack[i] = total;
        sum += stack[i];
    }

    return sum % (Math.pow(10, 9) +7);
}
