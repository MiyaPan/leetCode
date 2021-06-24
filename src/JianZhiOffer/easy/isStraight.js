/**
 * 剑指 Offer 61. 扑克牌中的顺子
 * https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/
*/
// TODO: 可以三刷下，别人的思路比较巧妙：https://leetcode-cn.com/problems/bu-ke-pai-zhong-de-shun-zi-lcof/solution/mian-shi-ti-61-bu-ke-pai-zhong-de-shun-zi-ji-he-se/
var isStraight = function(nums) {
    let n = nums.length;
    if (n > 13) return false;

    nums.sort((a,b)=> a-b);
    let i = 0;
    while (i < n && nums[i] === 0) i++;

    let map = {
        'A': 1,
        'J': 11,
        'Q': 12,
        'K': 13
    };

    let x = i;
    let num = nums[i];
    while (i < n) {
        let cur = nums[i];
        if (!/[1-9]/.test(cur)) {
            cur = map[cur];
        }
        if (cur === num) {
            i++;
        } else {
            if (x === 0) return false;
            x--;
        }
        num++;
    }
    return true;
};
