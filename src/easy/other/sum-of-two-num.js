export const sumOfTwoNum = (nums, target) => {
    const map = {};

    for (let i = 0; i < nums.length; i++) {
        /*
        使用void 0代替undefined的原因是:
        1. viod 0 比 undefined 少3个字节
        2. undefined 不是 js 保留字[null 是]，可以被赋值，不能保证唯一性，而 void 0 可以
        */
        //    let undefined = 1;
        //    let null = 1; null代表空值，代表“定义了但是为空”。而undefined的代表未定义。

        if (map[target - nums[i]] !== undefined) {
            return [map[target - nums[i]], i];
        } else {
            map[nums[i]] = i;
        }
    }

    return [0, 0]
}