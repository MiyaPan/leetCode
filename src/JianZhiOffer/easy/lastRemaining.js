/**
 * 剑指 Offer 62. 圆圈中最后剩下的数字
 * 0,1,···,n-1这n个数字排成一个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字（删除后从下一个数字开始计数）。
 * 求出这个圆圈里剩下的最后一个数字。

    例如，0、1、2、3、4 这5个数字组成一个圆圈，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。
     
    示例 1：
    输入: n = 5, m = 3
    输出: 3
    
    示例 2：
    输入: n = 10, m = 17
    输出: 2

    限制：
    1 <= n <= 10^5
    1 <= m <= 10^6

    链接：https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof
*/
// TODO: 三刷！！
// 0 1 2 3 4 5 6 7 
// 删除 2 就是相当于把 0 1 2 挪到右边，3 做开头，重新去数 3
// 每轮删除都相当于把 3 个元素拿到后面，
// 所以反推，每轮的上一轮就是把 后面的 3 个元素加回到前面，
// 加了之后可能会超过上一轮的总长度，所以要对上一轮总长度 取模
// 到最后一轮活下来的元素肯定 index 是 0，所以每轮 加回 m 进行反推
// 参考这个启发：https://leetcode-cn.com/problems/yuan-quan-zhong-zui-hou-sheng-xia-de-shu-zi-lcof/solution/huan-ge-jiao-du-ju-li-jie-jue-yue-se-fu-huan-by-as/
var lastRemaining = function(n, m) {
    let idx = 0;
    for (let i = 2; i <= n; i++) {
        idx = (idx + m) % i;
    }
    return idx;
};