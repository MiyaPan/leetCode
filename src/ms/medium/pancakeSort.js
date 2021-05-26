/**
 * 969. 煎饼排序
 * https://leetcode-cn.com/problems/pancake-sorting/
*/
// 输入：[3,2,4,1]
// 输出：[4,2,4,3]
// 解释：
// 我们执行 4 次煎饼翻转，k 值分别为 4，2，4，和 3。
// 初始状态 A = [3, 2, 4, 1]
// 第一次翻转后 (k=4): A = [1, 4, 2, 3]
// 第二次翻转后 (k=2): A = [4, 1, 2, 3]
// 第三次翻转后 (k=4): A = [3, 2, 1, 4]
// 第四次翻转后 (k=3): A = [1, 2, 3, 4]，此时已完成排序。
/**
 * =============================
 * 二刷
*/
export var pancakeSort = function(arr) {
    let n = arr.length;
    let ans = [];
    for (let i = n; i >= 1; i--) {
        let tar = i;
        let tarIdx = arr.findIndex(item => item === tar);
        if (tarIdx !== i-1) {
            if (tarIdx !== 0) {
                // 先操作一步，挪到 0
                ans.push(tarIdx+1);
                reverse(arr, 0, tarIdx);
            }
            // 再操作一步，挪到 该到的位置
            ans.push(i);
            reverse(arr, 0, i-1);
        }
    }
    return ans;
}
function reverse(arr, start, end) {
    let l = start;
    let r = end;
    while (l < r) {
        swap(arr, l ,r);
        l++;
        r--;
    }
}
function swap(arr, i ,j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}














/**
 * =============================
 * 一刷
*/
var pancakeSort1 = function(arr) {
    let len = arr.length;
    if (len === 0) return [];

    let end = len - 1;
    let ans = [];

    while(end > 0) {
        moveBig2End(arr, end, ans);
        end--;
    }

    return ans;
};

function moveBig2End1(arr, end, ans) {
    // 最大的已经在最后了
    if (arr[end] === end + 1) return;
    let indexOfBig = findIndexOfBig(arr, end);
    if (indexOfBig === 0) {
        // 直接翻转所有，把大的转到尾部
        rotate(arr, end)
        ans.push(end+1);
    } else {
        // 先把最大的翻转到头部
        rotate(arr, indexOfBig);
        ans.push(indexOfBig+1);
        // 再整体翻转，把大的翻转到尾部
        rotate(arr, end);
        ans.push(end+1);
    }
}

// 可以用原生的 reverse 代替
function rotate1(arr, end) {
    for (let i = 0; i <= parseInt(end/2); i++) {
        let temp = arr[i];
        arr[i] = arr[end-i];
        arr[end-i] = temp;
    }
}

function findIndexOfBig1(arr, end) {
    for (let i = 0; i <= end; i++) {
        if (arr[i] === end + 1) return i;
    }
}
