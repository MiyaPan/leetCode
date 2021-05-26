/**
 * 11. 盛最多水的容器
 * 给你 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0) 。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
    说明：你不能倾斜容器。

    示例 1：
    输入：[1,8,6,2,5,4,8,3,7]
    输出：49 
    解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
    
    示例 2：
    输入：height = [1,1]
    输出：1
    
    示例 3：
    输入：height = [4,3,2,1,4]
    输出：16
    
    示例 4：
    输入：height = [1,2,1]
    输出：2

    提示：
    n = height.length
    2 <= n <= 3 * 104
    0 <= height[i] <= 3 * 104

    链接：https://leetcode-cn.com/problems/container-with-most-water
*/
/**
 * @param {number[]} height
 * @return {number}
 */
/**
 * =============================
 * 二刷
*/
var maxArea = function(height) {
    let n = height.length;
    let l = 0;
    let r = n-1;
    let max = 0;
    while (l < r) {
        let cur = Math.min(height[l], height[r]) * (r-l);
        max = Math.max(max, cur);
        if (height[l] < height[r]) {
            l++;
        } else {
            r--;
        }
    }
    return max;
}












/**
 * =============================
 * 一刷
*/
// 我靠，竟然瞎写一把过，，，虽然自己都没怎么证明好，就是隐约觉得，如果两个竖线的面积定了，那么他俩中间任何短的线都不应该被考虑了
// 如果被短边限制了，就应该去找下一个长的试试，试成功了就成功，不成功则还是短边的值
// 如果左指针高定好了，那右边指针只要挪小了就会减小面积
/**
 * 参考答案的证明：
 * 如果 lh <= rh，那么如果 l 不动，r 无论怎么移动都不会超过当前的面积：
 *      如果 r 移动到了更 高 的位置：因为最短的柱子就是 lh，即使 新的 rh 再高也要被 lh 限制，但是间距缩小了，所以肯定会更小
 *      如果 r 移动到了更 低 的位置：那就是 h 也小了，间距也小了，必然更小
 *   所以：移动那根长的柱子 rh 是不管用的，必须移动 短的 lh 进行新的尝试
 * 如果 rh < lh，同理，要挪动短的柱子，谁短舍弃谁
 * (相等的情况可以如上证明，想不通的话：如果 lh = rh，就任意挪动一个看看，因为 max 已经保存在全局了，探测并不会影响)
*/
/**
 * 这位同学证明的很形象:
 * 感觉这个移动有点博弈论的味了，每次都移动自己最差的一边，
 * 虽然可能变得更差，但是总比不动（或者减小）强，动最差的部分可能找到更好的结果，
 * 但是动另一边总会更差或者不变，兄弟们，这不是题，这是人生，逃离舒适圈！！（这解释我觉得无敌了，哈哈哈）
 * 或者说：从两头开始内卷，先卷了挫的那头
*/
/**
 * 如果 lh 和 rh 相等时，是可以同时移动的，因为：
 * 假设随便移动一个，不管移动后的值比原值大还是小，总容积后不会比原来的值大。
 * 只能等到中间有两个更大的数才有可能比原值容积大，这时你两个指针都不会指向原来的地方。
 * 所以相等同时移动是对的
*/
var maxArea = function(height) {
    let n = height.length;
    let l = 0;
    let r = n-1;
    let max = 0;
    while(l <= r) {
        let area = 0;
        let lh = height[l];
        let rh = height[r];
        // 这里不用 +1，走个 case 就知道了，因为求的是面积，不是统计个数
        // area = Math.min(lh, rh) * (r-l+1);
        area = Math.min(lh, rh) * (r-l+1);
        max = Math.max(max, area);
        if (lh <= rh) {
            l++;
        } else {
            r--;
        }
    }
    return max;
};
