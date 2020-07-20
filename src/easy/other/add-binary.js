/**
 * 67. 二进制求和
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。输入为 非空 字符串且只包含数字 1 和 0。
 * 
 * 示例 1:
 * 
 * 输入: a = "11", b = "1"
 * 输出: "100"
 * 示例 2:
 * 
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 * 
 * 提示：
 * 每个字符串仅由字符 '0' 或 '1' 组成。
 * 1 <= a.length, b.length <= 10^4
 * 字符串如果不是 "0" ，就都不含前导零。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/add-binary
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/
// 耗时打败 89.48%，空间打败 11.11%
export const addBinary = (a, b) => {
    // 让 a 是长的
    if (a.length < b.length) {
        let temp = a;
        a = b;
        b = temp;
    }

    let sum = 0;
    let c = [];
    let pre = 0;
    for(let i = a.length - 1, j = b.length - 1; i>= 0; i--, j--) {
        let bj = +b[j] || 0;
        sum = +a[i] + bj + pre;
        if (sum > 1) {
            pre = 1;
            sum = sum % 2;
        } else {
            pre = 0;
        }
        c.unshift(sum);
    }

    if (pre === 1) {
        c.unshift(1);
    }

    return c.join('');
}

// 解法2：都转成 10 进制，加完再转回 2 进制。

/**
 * 解法3：位运算
 * 1. 按位异或，得到不带进位的结果
 * 2. 按位与，然后左移一为，
 * 3. 上步加和，得到新值，为 a，进位为 b ，重复
 * https://leetcode-cn.com/problems/add-binary/solution/er-jin-zhi-qiu-he-by-leetcode/
 */
// 不想写了。没意义
// export const addBinary = (a, b) => {
//     let a = parseInt(a, 2);
//     let b = parseInt(b, 2);

//     let sumNoCarry = a^b;
//     let carry = (a&b) << 1;

//     return sumNoCarry + carry;
// }
