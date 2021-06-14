
## 背包问题：

参考：https://leetcode-cn.com/problems/combination-sum-iv/solution/xi-wang-yong-yi-chong-gui-lu-gao-ding-bei-bao-wen-/
参考：https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/yi-pian-wen-zhang-chi-tou-bei-bao-wen-ti-a7dd/

## 界定是不是背包 - 选或不选组成XX
1. 只要给一堆东西，让你**这样选或者那样选**，组成啥，就是背包问题！
2. 背包问题一定是某个元素**选或不选**，不会强制都用上，才能用背包的模板，所以要转化下，比如：494. 目标和，常见的就是求和取一半
3. 组成的多数是个固定值，少数是不高于 XX 的最大值(最原始的背包或者1049. 最后一块石头的重量 II)

## 背包分类
01 背包：元素不可重用；
完全背包：可重用；
组合背包：元素顺序不同算不同结果，前两者不考虑顺序问题，只需挑出元素

## 分类解题模板
背包问题大体的解题模板是两层循环，1.物品nums；2.背包容量target。然后写转移方程，
根据背包的分类我们确定物品和容量遍历的先后顺序，根据问题的分类我们确定状态转移方程的写法

### 首先是背包分类的模板：一层物品，一层背包
1、0/1背包：外循环nums,内循环target,target **倒序**且 target>=nums[i];
2、完全背包：外循环nums,内循环target,target **正序**且 target>=nums[i];
3、组合背包：外循环target,内循环nums,target **正序**且 target>=nums[i];
4、分组背包：这个比较特殊，需要三重循环：最外层为分组 k, 然后遍历 target，最后遍历 nums【固定的！！！不用分析是否与顺序有关】

即：
1.如果是0-1背包，即数组中的元素不可重复使用，nums放在外循环，target在内循环，且内循环倒序；
for num in nums:
    for i in range(target, nums-1, -1): // -1　是逆序的意思
2.如果是完全背包，即数组中的元素可重复使用，nums放在外循环，target在内循环。且内循环正序。
for num in nums:
    for i in range(nums, target+1):
3.如果组合问题需考虑元素之间的顺序，需将target放在外循环，将nums放在内循环。
for i in range(1, target+1):
    for num in nums:


### 然后是问题分类的模板：
1、最值问题: dp[i] = max/min(dp[i], dp[i-nums]+1)或dp[i] = max/min(dp[i], dp[i-num]+nums);
2、存在问题(bool)：dp[i]=dp[i] || dp[i-num];
3、"组合"问题：dp[i]+=dp[i-num];【这个组合就是排列组合的意思，不是组合背包的组合】

作者：eh-xing-qing
链接：https://leetcode-cn.com/problems/partition-equal-subset-sum/solution/yi-pian-wen-zhang-chi-tou-bei-bao-wen-ti-a7dd/

### 当然拿到问题后，需要做到以下几个步骤：
1.分析是否为背包问题，有 3 中： 0-1 背包【元素不可重用】，完全背包【可重用】，组合背包【元素顺序不同算不同结果，前两者不考虑顺序问题，只需挑出元素】。
2.是以上三种背包问题中的哪一种。
3.是0-1背包问题还是完全背包问题。也就是题目给的nums数组中的元素是否可以重复使用。
4.如果是组合问题，是否需要考虑元素之间的顺序。需要考虑顺序有顺序的解法，不需要考虑顺序又有对应的解法。

### 接下来讲一下背包问题的判定
背包问题具备的特征：给定一个target，target可以是数字也可以是字符串，再给定一个数组nums，nums中装的可能是数字，也可能是字符串，问：能否使用nums中的元素做各种排列组合得到target。

### 背包问题技巧：

tips1: 与顺序相关的 nums 放内层，其他放外层。【数组中的元素可以重复出现但顺序可以不一致，此时nums放在内循环】
tips2: nums 可重用的，target 顺序遍历，不可重用的【即 0-1问题】逆序遍历。


1.如果是0-1背包，即数组中的元素不可重复使用，nums放在外循环，target在内循环，且内循环倒序；

>如果是0-1背包，即数组中的元素不可重复使用，nums放在外循环，target在内循环，且内循环倒序。 因为顺着nums遍历可以做到选和不选，过了num就与下一个num无关了，因此nums在外循环， 内循环倒序是因为倒序更新第c个值时，前面的第c-num的状态是未选择当前num的状态，从前往后更新不知道前面的状态是否选了num。

```js
for num in nums:
    for i in range(target, nums-1, -1):
```

题目如：
(416. 分割等和子集)[https://leetcode-cn.com/problems/partition-equal-subset-sum/description/]【元素不重用+与顺序排列无关 = 0-1 背包 = 所以 nums 在外，且倒序】

2.如果是完全背包，即数组中的元素可重复使用，nums放在外循环，target在内循环。且内循环正序。

>如果是完全背包，数组中的元素可以重复出现，此时nums放在外层循环是为了方便递归，其实完全背包nums在外循环或内循环均可，nums放在外层可以避免target重复调用，但target必须正序遍历。完全背包的目的一般是求最值。

```js
for num in nums:
    for i in range(nums, target+1):
```

题目如：
(139. 单词拆分)[https://leetcode-cn.com/problems/word-break/]



3.如果组合背包，需考虑元素之间的顺序，需将target放在外循环，将nums放在内循环。

> 如果是组合背包，数组中的元素可以重复出现但顺序可以不一致，此时nums放在内循环，target放在外循环，正序遍历，因为这样dp的每个状态更新时都不用考虑前面的状态是否选择了第i个num。组合背包的问题一般是求组合个数。


 target 放在外层循环，得到的是所有种组合可能。如果target 在内层循环，得到的是去重后的结果。比如target=4，nums[1,2,3]，不去重的话，1,2,1和2,1,1算两种结果，但是去重的话，只能算一种。

target 放在外层循环的话，是一个target的值对应nums所有的值，说的简单点就是这个target的值由nums中的某些组成，所以是有可能重复的。

```js
for i in range(1, target+1):
    for num in nums:
```

### 唉，状态转移方程都是固定的，看题目问啥就用啥..

1、组合背包问题：
(377. 组合总和 Ⅳ)[https://leetcode-cn.com/problems/combination-sum-iv/description/]
(494. 目标和)[https://leetcode-cn.com/problems/target-sum/]
(518. 零钱兑换 II)[https://leetcode-cn.com/problems/coin-change-2/description/] 【兑换的种数】
2、True、False问题：
(139. 单词拆分)[https://leetcode-cn.com/problems/word-break/]【完全背包】
(416. 分割等和子集)[https://leetcode-cn.com/problems/partition-equal-subset-sum/description/]【0-1 背包】
3、最大最小问题：
(474. 一和零)[https://leetcode-cn.com/problems/ones-and-zeroes/description/]【0-1 背包】
(322. 零钱兑换)[https://leetcode-cn.com/problems/coin-change/description/] 【兑换使用的最少硬币数】

1. 组合背包公式

```
dp[i] += dp[i-num]
```

2. True、False问题公式

```
dp[i] = dp[i] or dp[i-num]
```

3. 最大最小问题公式

```
dp[i] = min(dp[i], dp[i-num]+1)或者dp[i] = max(dp[i], dp[i-num]+1)
```

以上三组公式是解决对应问题的核心公式。
