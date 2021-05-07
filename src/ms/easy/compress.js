/**
 * 443. 压缩字符串
 * 给定一组字符，使用原地算法将其压缩。压缩后的长度必须始终小于或等于原数组长度。
    数组的每个元素应该是长度为1 的字符（不是 int 整数类型）。
    在完成原地修改输入数组后，返回数组的新长度。

    进阶：
    你能否仅使用O(1) 空间解决问题？

    示例 1：
    输入：
    ["a","a","b","b","c","c","c"]
    输出：
    返回 6 ，输入数组的前 6 个字符应该是：["a","2","b","2","c","3"]

    说明：
    "aa" 被 "a2" 替代。"bb" 被 "b2" 替代。"ccc" 被 "c3" 替代。
    
    示例 2：
    输入：
    ["a"]
    输出：
    返回 1 ，输入数组的前 1 个字符应该是：["a"]
    解释：
    没有任何字符串被替代。
    
    示例 3：
    输入：
    ["a","b","b","b","b","b","b","b","b","b","b","b","b"]
    输出：
    返回 4 ，输入数组的前4个字符应该是：["a","b","1","2"]。
    解释：
    由于字符 "a" 不重复，所以不会被压缩。"bbbbbbbbbbbb" 被 “b12” 替代。
    注意每个数字在数组中都有它自己的位置。

    提示：
    所有字符都有一个ASCII值在[35, 126]区间内。
    1 <= len(chars) <= 1000。

    链接：https://leetcode-cn.com/problems/string-compression
*/
/**
 * =============================
 * 二刷
*/
var compress = function(chars) {
    let n = chars.length;
    let p = 0;
    let i = 0;
    let cur;
    // ["a","a","b","b","c","c","c"]
    // ["a","a","a","a","a","b"]
    while (i < n) {
        cur = chars[i];
        let count = 0;
        while (chars[i] === cur) {
            count++;
            i++;
        }
        chars[p++] = cur;
        if (count > 1) {
            countArr = (count + '').split('');
            for (let j = 0; j < countArr.length; j++) {
                chars[p++] = countArr[j];
            }
        }
    }
    return p;
};
compress(["a","a","a","a","a","b"]);

/**
 * =============================
 * 一刷
*/
// 从 1 开始向前判断是不是一致，也可以从 0 开始向后判断是不是一致！！！
export var compress1 = function(chars) {
    let n = chars.length;
    let p = 1;
    let count = 1;
    // a, a, a, b, c, d
    // ["a","a","b","b","c","c","c"]
    for (let i = 1; i < n; i++) {
        if (chars[i] === chars[i-1]) {
            count++;
        } else {
            if (count > 1) {
                let chars = count.toString().split('');
                chars.forEach(num => {
                    chars[p++] = num;
                });
            }
            chars[p++] = chars[i];
            count = 1;
        }
    }

    // 放入最后一个元素
    if (count > 1) {
        let chars = count.toString().split('');
        chars.forEach(num => {
            chars[p++] = num;
        });
    }
    return p;
};
