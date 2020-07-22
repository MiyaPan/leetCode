/**
 * 475. 供暖器
 * 冬季已经来临。 你的任务是设计一个有固定加热半径的供暖器向所有房屋供暖。
    现在，给出位于一条水平线上的房屋和供暖器的位置，找到可以覆盖所有房屋的最小加热半径。
    所以，你的输入将会是房屋和供暖器的位置。你将输出供暖器的最小加热半径。

    说明:
    给出的房屋和供暖器的数目是非负数且不会超过 25000。
    给出的房屋和供暖器的位置均是非负数且不会超过10^9。
    只要房屋位于供暖器的半径内(包括在边缘上)，它就可以得到供暖。
    所有供暖器都遵循你的半径标准，加热的半径也一样。

    示例 1:
    输入: [1,2,3],[2]
    输出: 1
    解释: 仅在位置2上有一个供暖器。如果我们将加热半径设为1，那么所有房屋就都能得到供暖。

    示例 2:
    输入: [1,2,3,4],[1,4]
    输出: 1
    解释: 在位置1, 4上有两个供暖器。我们需要将加热半径设为1，这样所有房屋就都能得到供暖。

    链接：https://leetcode-cn.com/problems/heaters
*/
export const findRadius = (houses, heaters) => {
    heaters.sort((a,b) => a-b);

    let n = heaters.length;
    let max = 0;
    for (let h of houses) {
        let l = 0;
        let r = n - 1;
        let radius = 0;
        let m = 0;
        while(l <= r) {
            m = parseInt((l+r)/2);
            let heater = heaters[m];
            if (heater === h) {
                // 这里赋值了没用，下面 if else 又覆盖了
                radius = 0;
                break;
            } else if (heater > h) {
                r = m -1;
            } else {
                l = m + 1;
            }
        }
        // 越界的单独拿出来判断，也是个不错的思路
        if (h === heaters[m]) {
            radius = 0;
        } else if (l > n - 1) {
            radius = h - heaters[n-1];
        } else if (r < 0) {
            radius = heaters[0] - h;
        } else {
            radius = Math.min(Math.abs(heaters[l]-h), Math.abs(heaters[r]-h));
        }
        max = Math.max(max, radius);
    }

    return max;
}
