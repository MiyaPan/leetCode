/**
 * 剑指 Offer 11. 旋转数组的最小数字
 * 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，
 * 输出旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一个旋转，该数组的最小值为1。  

    示例 1：
    输入：[3,4,5,1,2]
    输出：1

    示例 2：
    输入：[2,2,2,0,1]
    输出：0

    链接：https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof
    本题与主站 154 题相同：https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/
*/
// 10，1，10，10，10，10，10 这个 case 决定了不能 m 和 l 比，他俩确定不了
// 得找个能确定区间的值比
export const minArray = (numbers) => {
    let n = numbers.length;

    let l = 0;
    let r = n - 1;
    let first = numbers[0];
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (numbers[m] < numbers[m-1]) {
            return numbers[m];
        } else if (numbers[m] > first) {
            l = m + 1;
        } else if (numbers[m] < first) {
            r = m - 1;
        } else {
            // numbers[m] === first
            // l++ 不行，会把 1 跳过去
            // r--; 也不行，还是用答案的方法吧
        }
    }
    return first;
}

// https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/solution/mian-shi-ti-11-xuan-zhuan-shu-zu-de-zui-xiao-shu-3/
export const minArray1 = (numbers) => {
    let n = numbers.length;

    let l = 0;
    let r = n - 1;
    while(l <= r) {
        let m = parseInt((l+r)/2);
        if (numbers[m] < numbers[r]) {
            // r = m -1;
            // 如果 m 正好指向最小，一减就跳过了，只要判断 = m 不死循环，就可以 = m 啊
            r = m;
        } else if (numbers[m] > numbers[r]) {
            l = m + 1;
        } else if (numbers[m] === numbers[r]) {
            // 因为下个循环又和 r 比，所以不会发生上面解法的跳过
            r--;
        }
    }
    return numbers[l];
}
