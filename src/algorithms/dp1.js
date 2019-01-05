

/**
 * 给一个浮点数序列，取最大乘积连续子串的值，例如 -2.5，4，0，3，0.5，8，-1，则取出的最大乘积连续子串为3，0.5，8。也就是说，上述数组中，3 0.5 8这3个数的乘积30.58=12是最大的，而且是连续的
 * @param {*} a 
 */
function MaxProductSubstring (a) {
    let maxEnd = a[0]
    let maxRes = a[0]

    for (let i = 1; i < a.length; i++) {
        maxEnd = Math.max(maxEnd * a[i], a[i])
        maxRes = Math.max(maxRes, maxEnd)
    }

    return maxRes
}

console.log(MaxProductSubstring([-2.5,4,0,3,0.5,8,-1])); // 12

/**
 * 给定一个长度为N的整数数组，只允许用乘法，不能用除法，计算任意（N-1）个数的组合中乘积最大的一组，并写出算法的时间复杂度
 * 
 */

 function MaxProductSubsequence(a) {
    let maxEnd = a[0]
    let maxRes = a[0]

    for (let i = 1; i < a.length; i++) {
        if (a[i] === 0) continue;
        if (0 < a[i] && a[i] < 1) continue;
        let pre = maxEnd;
        maxEnd = Math.max(pre, maxEnd * a[i])
        maxRes = Math.max(maxRes, maxEnd)
    }

    return maxRes
 }

 console.log(MaxProductSubsequence([-2.5,4,0,3,0.5,8,-1].sort((a, b) => {return a-b})))

 /**
  * Maximum Contiguous subarray algorithm
  * 
  * Max(i) = Max(i-1) + v(i)
  * Max(i-1) < 0 ? v(i) : Max(i-1)
  * 
  * Combining
---------
maxInc(i) = maxInc(i - 1) > 0 ? maxInc(i - 1) + val(i) : val(i)
max(i) = maxInc(i) > max(i - 1) ? maxInc(i) : max(i - 1)
  */

const numbers = [-2, 1, 3, 4, -1, 2, 1, -5, 4];
function maxSubArray (ary) {
    if (ary.length === 0) {
        return [];
    }

    let maxInc = ary[0];
    let max = ary[0];
    let maxStartInx = 0;
    let maxEndInx = 0;

    for (let i = 0; i < ary.length; i++) {
        const val = ary[i];

        maxInc = Math.max(maxInc + val, val);
        max = Math.max(max, maxInc);

        if (val === max) {
            maxStartInx = i
        }

        if (maxInc === max) {
            maxEndInx = i
        }

        return Array.slice(maxStartInx, maxEndInx + 1)
    }
}
console.log('maxSubArray', maxSubArray(numbers));