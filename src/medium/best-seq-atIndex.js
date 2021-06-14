/**
 * 面试题 17.08. 马戏团人塔
 * 有个马戏团正在设计叠罗汉的表演节目，一个人要站在另一人的肩膀上。出于实际和美观的考虑，
 * 在上面的人要比下面的人矮一点且轻一点。
 * 已知马戏团每个人的身高和体重，请编写代码计算叠罗汉最多能叠几个人。

    示例：

    输入：height = [65,70,56,75,60,68] weight = [100,150,90,190,95,110]
    输出：6
    解释：从上往下数，叠罗汉最多能叠 6 层：(56,90), (60,95), (65,100), (68,110), (70,150), (75,190)
    
    提示：
    height.length == weight.length <= 10000

    链接：https://leetcode-cn.com/problems/circus-tower-lcci
*/
/**
 * =============================
 * 二刷,done
*/
export var bestSeqAtIndex = function(height, weight) {
    // height = [65,70,56,75,60,68] weight = [100,150,90,190,95,110]
    let n = height.length;
    let people = [];
    for (let i = 0; i < n; i++) {
        people.push({weight: weight[i], height: height[i]});
    }
    people.sort((a,b) => {
        if (a.height === b.height) {
            return a.weight - b.weight;
        }
        return a.height - b.height;
    });
    console.log(people);

    let dp = Array(n).fill(1);
    let max = 1;
    for (let i = 1; i < n; i++) {
        // 不能这样直接筛选，这样筛出来是无序的，把 小于 weight 和 height 的都拿出来了，实际拿出来的这些也需要有顺序的
        // let numsJoinCur =
        //     people.filter(p => p.height < cur.height && p.weight < cur.weight).length;
        let numsJoinCur = getNumsJoinCur(people, dp, i);
        // 这样 dp 存了别人的，就不能在下面的函数给用了
        // dp[i] = Math.max(dp[i-1], numsJoinCur+1);
        dp[i] = numsJoinCur+1;
        max = Math.max(max, dp[i]);
    }
    console.log(dp);
    return max;
}
function getNumsJoinCur(people, dp, i) {
    let cur = people[i];
    let max = 0;
    for (let j = i-1; j >= 0; j--) {
        if (people[j].height < cur.height && people[j].weight < cur.weight) {
            // 这里不能找到就返回，得都找一遍，因为最靠后的 dp 数目不一定是最大
            max = Math.max(max, dp[j]);
        }
    }
    return max;
}

/**
 * =============================
 * 一刷
*/
// 这题的核心是用二分法求最长子序列：https://leetcode-cn.com/problems/longest-increasing-subsequence/solution/dong-tai-gui-hua-er-fen-cha-zhao-tan-xin-suan-fa-p/
export var bestSeqAtIndex1 = function(height, weight) {
    let n = height.length;
    if (n < 2) return n;

    let person = [];
    for (let i = 0; i < n; i++) {
        person[i] = {h: height[i], w: weight[i]};
    }

    person.sort((a,b) => {
        if (a.h === b.h) return b.w -a.w;
        return a.h - b.h;
    });

    let dp = [];
    dp[0] = person[0].w;
    let maxLen = 1;
    for (let i = 1; i < n; i++) {
        // 去 dp 中找该替换的位置
        let j = helper(dp, 0, maxLen-1, person[i].w);
        dp[j] = person[i].w;
        maxLen = dp.length;
    }

    return dp.length;
};

// 找第一个大于等于 target 的
function helper(dp, l, r, target) {
    while(l <= r) {
        let m = l + parseInt((r-l)/2);
        if (dp[m] === target) return m;
        if (dp[m] > target) {
            r = m - 1;
        } else {
            l = m + 1;
        }
    }

    return l;
}
