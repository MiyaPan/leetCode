/**
 * 1122. 数组的相对排序
 * 给你两个数组，arr1 和 arr2，
    arr2 中的元素各不相同
    arr2 中的每个元素都出现在 arr1 中
    对 arr1 中的元素进行排序，使 arr1 中项的相对顺序和 arr2 中的相对顺序相同。未在 arr2 中出现过的元素需要按照升序放在 arr1 的末尾。

    示例：
    输入：arr1 = [2,3,1,3,2,4,6,7,9,2,19], arr2 = [2,1,4,3,9,6]
    输出：[2,2,2,1,4,3,3,9,6,7,19]

    提示：
    1 <= arr1.length, arr2.length <= 1000
    0 <= arr1[i], arr2[i] <= 1000
    arr2 中的元素 arr2[i] 各不相同
    arr2 中的每个元素 arr2[i] 都出现在 arr1 中

    链接：https://leetcode-cn.com/problems/relative-sort-array
*/
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number[]}
 */
var relativeSortArray = function(arr1, arr2) {
    let map = {};
    for (let i = 0; i < arr1.length; i++) {
        if (map[arr1[i]]) {
            map[arr1[i]] += 1;
        } else {
            map[arr1[i]] = 1;
        }
    }

    let p = 0;
    for (let i = 0; i < arr2.length; i++) {
        while (map[arr2[i]] > 0) {
            arr1[p++] = arr2[i];
            map[arr2[i]] -= 1;
        }
    }

    let tempArr = Object.keys(map).filter(item => !arr2.includes(item));
    tempArr.sort((a,b) => a-b);
    for (let i = 0; i < tempArr.length; i++) {
        while (map[tempArr[i]] > 0) {
            arr1[p++] = tempArr[i];
            map[tempArr[i]] -= 1;
        }
    }
    return arr1;
};
