/**
 * 220. 存在重复元素 III
 * 在整数数组 nums 中，是否存在两个下标 i 和 j，使得 nums [i] 和 nums [j] 的差的绝对值小于等于 t ，
 * 且满足 i 和 j 的差的绝对值也小于等于 ķ 。
    如果存在则返回 true，不存在返回 false。

    示例 1:
    输入: nums = [1,2,3,1], k = 3, t = 0
    输出: true
    
    示例 2:
    输入: nums = [1,0,1,1], k = 1, t = 2
    输出: true
    
    示例 3:
    输入: nums = [1,5,9,1,5,9], k = 2, t = 3
    输出: false

    链接：https://leetcode-cn.com/problems/contains-duplicate-iii
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} t
 * @return {boolean}
 */
// 这个倒是没超时
// 答案解法二：平衡二叉搜索树，又借鉴了一点大小堆的思想，可以看下思路，但是 js 没有 Treeset 这个数据结构，木有办法啊，手写是太麻烦了
export var containsNearbyAlmostDuplicate = function(nums, k, t) {
    let len = nums.length;
    for (let i = 0; i < Math.max(len, len-k); i++) {
        for (let j = i+1; j <= Math.min(len-1, i+k); j++) {
            if (Math.abs(nums[i]-nums[j]) <= t) {
                return true;
            }
        }
    }
    return false;
};

// 答案解法三：借鉴了桶排序的思想。
// 上面的滑动窗口向前走的话，要去扫描窗口中的所有元素确定有没有。为了把窗口数组的扫描变成高效的，可以：
// 滑动“桶” - 桶是按照值的差 t 来划分的：“每 t 个为一组”，这样遍历一次，从头到尾的桶能不遗漏的都保存下来，
// 然后当桶的个数超过 k 的时候，删除掉头上的桶，就能维持坐标差 <= k 的性质

// O(n)神仙解法，桶，参考自https://leetcode.com/problems/contains-duplicate-iii/discuss/339421/Python-bucket-method-in-detail

// 首先，定义桶的大小是t+1, nums[i]//(t+1)决定放入几号桶,这样在一个桶里面的任意两个的绝对值差值都<=t
// 例如t=3, nums=[0 ,5, 1, 9, 3,4],那么0号桶就有[0,1,3],1号桶就有[4,5],2号桶就有[9]

// 先不考虑索引差值最大为K的限制，那么遍历nums每一个元素，并把他们放入相应的桶中，有两种情况会返回True

// 要放入的桶中已经有其他元素了，这时将nums[i]放进去满足差值<=t
// 可能存在前面一个桶的元素并且与nums[i]的差值<=t 或者 存在后面一个桶的元素并且与nums[i]的差值<=t
// 根据返回True的第一个条件，可以知道前后桶的元素最多也只能有一个。

// 接着考虑限制桶中的索引差最大为K,当i>=k的时候：
// 我们就要去删除存放着nums[i-k]的那个桶(编号为nums[i-k]//(t+1))
// 这样就能保证遍历到第i+1个元素时，全部桶中元素的索引最小值是i-k+1，就满足题目对索引的限制了

// 链接：https://leetcode-cn.com/problems/contains-duplicate-iii/solution/li-yong-tong-de-yuan-li-onpython3-by-zhou-pen-chen/
export var containsNearbyAlmostDuplicate = function(nums, k, t) {
    let len = nums.length;
    let map = new Map();
    for (let i = 0; i < len; i++) {
        let num = nums[i];
        let bucketId = getBucketId(num, t);
        if (map.has(bucketId)) return true;
        if (map.has(bucketId-1) && Math.abs(map.get(bucketId-1) - num) <= t) return true;
        if (map.has(bucketId+1) && Math.abs(map.get(bucketId+1) - num) <= t) return true;

        map.set(bucketId, num);
        // 删除头上的桶，不用去获取最小的桶的 id，可以
        // 只要 i >= k(i 从 0 开始，所以等的时候就要删除了) 了，每次都删除一个，删除的是 nums[i-k] 对应的，就可以了
        if (i >= k) {
            map.delete(getBucketId(nums[i-k], t));
        }
    }
    return false;
};

function getBucketId(num, t) {
    // 为啥用 t + 1，不用 t：因为 t 可能是 0 啊！！为了防止除以 0 啊
    // t 只是个差值，只是个步长，并不影响计算结果，相当于只是把 map[1] 的放到了 map[2] 里，后面都是这么拿的 id，所以没问题
    return Math.floor(num / (t+1));
}
