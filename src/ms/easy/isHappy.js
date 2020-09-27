/**
 * 202. 快乐数
 * 编写一个算法来判断一个数 n 是不是快乐数。

「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，
 也可能是 无限循环 但始终变不到 1。如果 可以变为  1，那么这个数就是快乐数。

    如果 n 是快乐数就返回 True ；不是，则返回 False 。

    示例：
    输入：19
    输出：true
    解释：
    1^2 + 9^2 = 82
    8^2 + 2^2 = 68
    6^2 + 8^2 = 100
    1^2 + 0^2 + 02 = 1

    链接：https://leetcode-cn.com/problems/happy-number
*/
// 思路1：用 set 或者 数组检测是否存在循环
var isHappy = function(n) {
    let set = new Set();
    while(n !== 1) {
        n = getNum(n);
        if (set.has(n)) return false;
        set.add(n);
    }
    return true;
};

function getNum(n) {
    let num = 0;
    while(n > 0) {
        num += (n%10) ** 2;
        n = parseInt(n/10);
    }
    return num;
}

// 思路1：用 set 或者 数组检测是否存在循环
export var isHappy = function(n) {
    let slow = n;
    let quick = getNum(n);
    // quick 会先到 1
    while(quick !== 1) {
        if (slow === quick) return false;
        slow = getNum(slow);
        // quick = getNum(slow);
        quick = getNum(getNum(quick));
    }
    return true;
};