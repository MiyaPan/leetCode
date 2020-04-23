function deepEqual(obj1, obj2) {
    // 引用相肯定相同
    if (obj1 === obj2) {
        return true;
    }

    // 一个为 null，一个不 null
    if (!!obj1 && typeof obj1 === 'object' && !!obj2 && typeof obj2 === 'object') {

        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }

        for(let prop in obj1) {
            if (obj2.hasOwnProperty(prop)) {
                // 常量的相等在第一个 if 就退出来了
                // if (!deepEqual(obj1.prop, obj2.prop)) { 不能用.  因为是变量啊，会返回undefined
                if (!deepEqual(obj1[prop], obj2[prop])) {
                    return false;
                }
            } else {
                return false;
            }

            return true;
        }
    }

    return false;
}

export {deepEqual}