/**
import { indexOf } from '../../easy/index-of';
 * 91. 解码方法
 * https://leetcode-cn.com/problems/decode-ways/
*/

// 动态规划：先分类讨论！！！然后总结子问题，然后总结动态转移方程

// 这个题目太坑了，全是边界处理，都是试出来的，，，，先处理当前是 0 的，如果不是 0，也分 3 中情况，看看有没有能合并的
export const numDecodings = (s) => {
    if (s.indexOf('0') === 0) return 0;
    let dp =[1];
    for (let i = 1; i< s.length; i++) {
        if (s[i] === '0') {
            // 这里可以合并，当前位是 0 的时候，前一位必须为 1或者2，否则都直接 return
            // if (s[i-1] === '0') return 0;
            // if ((+s[i-1]) < 3) {
            //     dp[i] = dp[i-2] || 1;
            // } else {
            //     return 0;
            // }
            if (s[i-1] === '1' || s[i-1] === '2') {
                dp[i] = dp[i-2] || 1;
            } else {
                return 0;
            }
        } else {
            // 这个 0 和最后的 else 不能合并，否则 中间的 if 会成立
            if (s[i-1] === '0') {
                // 如果前一位是 0，那这一位，只能单独划分，跟谁都合并不了，所以等于没增加情况
                dp[i] = dp[i-1];
            } else if ((+s[i-1]) * 10 + (+s[i]) <= 26) {
                dp[i] = dp[i-1] + (dp[i-2] || 1);
            } else {
                dp[i] = dp[i-1];
            }
        }
    }
    return dp[s.length-1];
}

// https://leetcode-cn.com/problems/decode-ways/solution/c-wo-ren-wei-hen-jian-dan-zhi-guan-de-jie-fa-by-pr/
// 不做加法乘法，直接判断字符
export const numDecodings1 = (s) => {
    if (s.indexOf('0') === 0) return 0;
    let dp =[1];
    for (let i = 1; i< s.length; i++) {
        if (s[i] === '0') {
            if (s[i-1] === '1' || s[i-1] === '2') {
                dp[i] = dp[i-2] || 1;
            } else {
                return 0;
            }
        } else {
            // 这个 0 和最后的 else 不能合并，否则 中间的 if 会成立
            if (s[i-1] === '1' || s[i-1] === '2' && (s[i] >= '1' && s[i] <= '6')) {
                dp[i] = dp[i-1] + (dp[i-2] || 1);
            } else {
                dp[i] = dp[i-1];
            }
        }
    }
    return dp[s.length-1];
}

// 上面完全可以节省空间，因为之要最后的状态，且，下一个状态只与前一个有关
// 上面答案的节省方法可以再看看
export const numDecodings1 = (s) => {
    if (s.indexOf('0') === 0) return 0;

    let cur = 1;
    let pre = 1;
    // 保存往前数 2 个
    let prepre = 1;
    for (let i = 1; i< s.length; i++) {
        if (s[i] === '0') {
            if (s[i-1] === '1' || s[i-1] === '2') {
                cur = prepre;
                prepre = pre;
            } else {
                return 0;
            }
        } else {
            // 这个 0 和最后的 else 不能合并，否则 中间的 if 会成立
            if (s[i-1] === '1' || s[i-1] === '2' && (s[i] >= '1' && s[i] <= '6')) {
                cur = pre + prepre;
                prepre = pre;
                pre = cur;
            } else {
                cur = pre;
                prepre = pre;
            }
        }
    }
    return cur;
}
