/**
 * 179. 最大数
 * 给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。

    注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。

    示例 1：
    输入：nums = [10,2]
    输出："210"
    
    示例 2：
    输入：nums = [3,30,34,5,9]
    输出："9534330"
    
    示例 3：
    输入：nums = [1]
    输出："1"
    
    示例 4：
    输入：nums = [10]
    输出："10"

    提示：
    1 <= nums.length <= 100
    0 <= nums[i] <= 109

    链接：https://leetcode-cn.com/problems/largest-number
*/
/**
 * @param {number[]} nums
 * @return {string}
 */
/**
 * =============================
 * 二刷
*/
export var largestNumber = function(nums) {
    nums.sort((a, b) => {
        let lena = (a+'').length;
        let lenb = (b+'').length; 
        let newA = a * Math.pow(10,lenb) + b;
        let newB = b * Math.pow(10,lena) + a;
        if (newA === newB) {
            return lena - lenb;
        }
        return newB - newA;
    });
    while (nums[0] === 0) nums.shift();
    return nums.length === 0 ? '0' : nums.join('');
}








/**
 * =============================
 * 一刷
*/
// 思路：逐位比较，如果短的走完了，就从头走，循环比下去，直到某一位字符不同了。
// 特殊 case: 43243 432 这种，长的都走完了，也没比出不一样的，就把短的下一个该比的和长的 [0] 比
export var largestNumber = function(nums) {
    let len = nums.length;
    if (len === 1) return nums[0] + '';
    nums.sort((a,b) => {
        let stra = a + '';
        let strb = b + '';
        // stra 取短的， a b 交换了顺序返回就不对了，所以还是最后判断谁是长的吧...
        // if (stra.length > strb.length) {
        //     let temp = stra;
        //     stra = strb;
        //     strb = temp;
        // }
        // let len = Math.max(stra.length, strb.length);
        // let p = 0;
        // for (let i = 0; i < len; i++) {
        //     let cura = stra[i] || stra[p++];
        //     let curb = strb[i] || strb[p++];;
        //     if (cura !== curb) {
        //         return curb - cura;
        //     }
        //     if (p >= Math.min(stra.length, strb.length)) p = 0;
        // }
        // // 43243 432 这种，短的循环完了都和长的一致，只能比较短的下一位 p 是否大于长的 [0]
        // // 唉，这里也不能直接比 [0],因为：[111311, 1113] 0 都不够呢，还要继续比，直到不一样了
        // return stra.length > strb.length ? strb[p] - stra[0]: strb[0] - stra[p];

        // 防止 3，34 这种情况，不能从 1 开始计数
        // let cura = stra[0];
        // let curb = strb[0];
        // let i = 1;
        // let j = 1;
        let cura = '';
        let curb = '';
        let i = 0;
        let j = 0;
        let loopCnt1 = 0;
        let loopCnt2 = 0;
        while (cura === curb) {
            cura = stra[i++];
            curb = strb[j++];
            // 唉还有相同的数：[8308,8308,830]，还得判断是不是 a b 都对比完一轮了，实在相同就退出
            // if (i >= stra.length) i = 0;
            // if (j >= strb.length) j = 0;
            if (i >= stra.length) {
                i = 0;
                loopCnt1++;
            }
            if (j >= strb.length) {
                j = 0;
                loopCnt2++;
            }
            // 不管长短都转了 2 圈了，就想等了
            if (loopCnt1 >=2 && loopCnt2 >= 2) return 0;
        }
        return curb - cura;
    });

    // 去掉前缀 0
    while (nums[0] === 0 && nums.length > 1) nums.shift();

    return nums.join('');
};

