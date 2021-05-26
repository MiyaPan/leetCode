/**
 * 384. 打乱数组
 * 给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。
    实现 Solution class:

    Solution(int[] nums) 使用整数数组 nums 初始化对象
    int[] reset() 重设数组到它的初始状态并返回
    int[] shuffle() 返回数组随机打乱后的结果

    示例：
    输入
    ["Solution", "shuffle", "reset", "shuffle"]
    [[[1, 2, 3]], [], [], []]
    输出
    [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

    解释
    Solution solution = new Solution([1, 2, 3]);
    solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]
    solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
    solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]
     
    提示：
    1 <= nums.length <= 200
    -106 <= nums[i] <= 106
    nums 中的所有元素都是 唯一的
    最多可以调用 5 * 104 次 reset 和 shuffle

    链接：https://leetcode-cn.com/problems/shuffle-an-array
*/
/**
 * @param {number[]} nums
 */
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
// 获取随机是吧,始终获取前 n 个的随机是简单的,所以啊,就可以把随机到的移动到最后,始终获取前 n 的
// 也可以和答案Fisher-Yates 洗牌算法一样向前交换:https://leetcode-cn.com/problems/shuffle-an-array/solution/da-luan-shu-zu-by-leetcode/
// "交换元素"再处理的思想别的题目也用过,蛮不错的
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    this.nums = nums;
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.nums;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
// Solution.prototype.shuffle = function() {
//     let idxs = [];
//     let ans = [];
//     let n = this.nums.length;
//     for (let i = 0; i < n; i++) {
//         let rand = Math.floor(Math.random()*n);
//         while (idxs.includes(rand)) {
//             rand = Math.floor(Math.random()*n);
//         }
//         ans.push(this.nums[rand]);
//         idxs.push(rand);
//     }
//     return ans;
// };

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    let ans = [...this.nums];
    let n = this.nums.length;
    let end = n;
    for (let i = 0; i < n; i++) {
        let rand = Math.floor(Math.random()*n);
        swap(ans,rand, end-1);
        end--;
    }
    return ans;
};
// Solution.prototype.shuffle = function() {
//     let ans = [...this.nums];
//     let n = this.nums.length;
//     for (let i = 0; i < n; i++) {
//         let rand = getRandRange(i,n-1);
//         swap(ans,i,rand);
//     }
//     return ans;
// };
function getRandRange(min,max) {
    return Math.floor(Math.random()*(max-min+1) + min);
}
function swap(arr,i,j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

























/**
 * =============================
 * 一刷
*/
// 思路：随机摸牌嘛，用 use 记录被摸过的，不摸就行了。
// 答案思路：也是随机摸，摸到之后和前面指针 i (i 从 0 开始)交换位置，然后摸的范围是 [i, len-1]
var Solution = function(nums) {
    this.nums = nums;
};

/**
 * Resets the array to its original configuration and return it.
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.nums;
};

/**
 * Returns a random shuffling of the array.
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    let len = this.nums.length;
    let i = len;
    let ans = [];
    let used = {};
    while(i > 0) {
        // 忽略了，不能包含 上限
        let randIndex = Math.floor(Math.random()*len);
        while (used[randIndex]) {
            randIndex = Math.floor(Math.random()*len);
        }
        ans.push(this.nums[randIndex]);
        used[randIndex] = true;
        i--;
    }
    return ans;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
