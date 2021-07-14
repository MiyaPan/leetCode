/**
 * 1. 为什么 Promise 的 onFulfilled 和 onRejected 必须是异步的
 * 答：为了保持流程的一致性和可预测性predictable。比如：
 * 
 * let p = new Promise((resolve, reject) => {
 *  // 这里使用者可能直接去 resolve
 *  resolve();
 * });
 * 
 * 如果不强制 onFulfilled 和 onRejected 必须是异步的，那么，如下代码的顺序在同步调用和异步调用会产生不一致：
 * 
 * console.log(1)
 * p.then(() => {
 *  console.log(2)
 * });
 * console.log(3)
 * 
 * 如果 p 中是同步执行 resolve，输出: 123
 * 如果 p 中是异步中执行 resolve，输出: 132
 * 
 * 这就造成了不一致，这对使用者是非常不友好的
 * 
 * 这调规则是 Promise/A+ 2.2.4 规范指出的。这条规范创立之处就有很多分歧。
 * 不其强制异步的支持者认为：如果本来是同步的逻辑被强制异步执行，会有性能损失
 * 强制异步的支持者认为：流程可预测(predictably)是最为重要的, 这点性能重要性不如流程的一致性重要
 * 
 * 这里的异步可以通过 “宏任务” 或 “微任务” 实现，都可以，只要能保证异步：
 * 可以使用“宏任务”机制（例如setTimeout或setImmediate）或“微任务”机制（例如MutationObserver或process.nextTick）来实现
 * 
 * 原生的 Promise 是 V8 引擎提供的微任务，我们无法还原 V8 引擎的实现，所以这里使用 setTimeout 模拟异步，所以原生的是微任务，这里是宏任务。
 * 
 * 所以：then函数本身是同步，then 里面的 cb 是异步
 * 
 * 参考：https://github.com/promises-aplus/promises-spec/issues/68
 * https://github.com/chunpu/blog/issues/96
 * https://stackoverflow.com/questions/38059284/why-does-javascript-promise-then-handler-run-after-other-code
 * 
 * 
 * 2. 值穿透是指这种情况下：promise.then().then()
 *  then 没有声明回调，用了默认值，所以可以继续往下传；但是如果 then 里写了两个回调函数，往下传递的就是写的函数的返回值，如果函数没有返回值，就是 js 默认返回的 undefined 而已
*/
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = null;
        this.reason = null;
        // 同一个 promise 可以有多个 then 的回调哦
        this.resolveCbs = [];
        this.rejectCbs = [];

        executor(this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value) {
        if (this.status === PENDING) {
            this.value = value;
            this.status = FULFILLED;
            this.resolveCbs.forEach(cb => cb());
        }
    }

    reject(reason) {
        if (this.status === PENDING) {
            this.reason = reason;
            this.status = REJECTED;
            this.rejectCbs.forEach(cb => cb());
        }
    }

    then(onFulfilled, onRejected) {
        // 解决不传某个回调的问题
        onFulfilled = onFulfilled ? onFulfilled : v => v;
        // 为啥要 throw ？为了不走到后面 then 的 resolve 中
        onRejected = onRejected ? onRejected : error => {throw error};

        // 然后，return 一个新的 promise 就可以了
        // 这个新 promise 的状态由当前 promise 的状态决定
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        // 获取当前 promise onFulfilled 回调的返回值，即要往下 return 什么，默认值在上面 v => v
                        let res = onFulfilled(this.value);
                        // 把当前 promise 的值传递给 新promise，由于判断逻辑较多，单独抽函数处理
                        resolvePromise(promise2, res, resolve, reject);
                    } catch (err) {
                        reject(err);
                    }
                });
            }
            if (this.status === Promise.rejected) {
                setTimeout(() => {
                    try {
                        // 获取当前 promise onFulfilled 回调的返回值，即要往下 return 什么，默认值在上面 v => v
                        let res = onRejected(this.reason);
                        // 把当前 promise 的值传递给 新promise，由于判断逻辑较多，单独抽函数处理
                        resolvePromise(promise2, res, resolve, reject);
                    } catch (err) {
                        reject(err);
                    } 
                });
            }
            if (this.status === PENDING) {
                // 为啥不直接 push 回调：为了传递 value 值
                this.resolveCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let res = onFulfilled(this.value);
                            resolvePromise(promise2, res, resolve, reject);
                        } catch (err) {
                            reject(err);
                        } 
                    });
                });
                this.rejectCbs.push(() => {
                    setTimeout(() => {
                        try {
                            let res = onRejected(this.reason);
                            resolvePromise(promise2, res, resolve, reject);
                        } catch (err) {
                            reject(err);
                        } 
                    });
                });
            }
        });

        return promise2;
    }
}

function resolvePromise(promise2, res, resolve, reject) {
    if (promise2 === res) {
        reject(new Error('循环引用!'));
        return;
    }

    // 解决 resovle 和 reject 同时被调用的问题，谁先来执行谁
    let called;

    if (typeof res === 'object' && res !== null || typeof res === 'function') {
        // 这个 try 就是去捕获上一层 promise 中 throw 的 error 的，保证上面 throw 了，下面能进入 reject，而不是进到 if else 这两个
        // 不行，这里还不足以拦截上一层的 throw，所以得放到 回调注册的地方去 catch
        try {
            let then = res.then;
            if (typeof then === 'function') {
                // 如果 res 个被返回的 promise，那它一定没有写 then 呢，写 then 的还会生成新的 promise，所以始终是没 then 的，
                // 所以可以注册 then 去等待结果，看 promise2 能不能被 resolve
                then.call(
                    res,
                    (v) => {
                        // called 是在 res 这个 promise 的 then 的回调里，如果执行了回调，肯定会执行 resolve 或者 reject 其一，无论谁 called 都应该置为 true
                        if (called) return;
                        called = true;
    
                        // resolvePromise(res, v, resolve, reject)
                        resolvePromise(promise2, v, resolve, reject)
                    },
                    (e) => {
                        if (called) return;
                        called = true;
        
                        reject(e);
                    })
            } else {
                // res 是普通值，就直接 resolve promise2
                resolve(res);
            }
        } catch (err) {
            if (called) return;
            called = true;

            reject(err);
        }
    } else {
        // res 是普通值，就直接 resolve promise2
        resolve(res)
    }
}

Promise.all = (promises) => {
    return new Promise((resolve, reject) => {
        promises = Array.isArray(promises) ? promises : [];
        let len = promises.length;
        let ans = [];
        let count = 0;
        if(len === 0) resolve([]);
        for (let i = 0; i < len; i++) {
            if (promises[i] instanceof Promise) {
                promises[i].then(res => {
                    count++;
                    ans[i] = res;
                    if (count === len) resolve(ans);
                });
            } else {
                count++;
                ans[i] = promises[i];
                if (count === len) resolve(ans);
            }
        }
    })
}

Promise.race = (promises) => {
    return new Promise((resolve, reject) => {
        promises = Array.isArray(promises) ? promises : [];
        let len = promises.length;
        if (len === 0) resolve();
        promises.forEach(promise => promise.then(resolve, reject));
    });
}
