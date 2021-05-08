/**
 * 面试题 10.05. 稀疏数组搜索
 * 稀疏数组搜索。有个排好序的字符串数组，其中散布着一些空字符串，编写一种方法，找出给定字符串的位置。

    示例1:
    输入: words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ta"
    输出：-1
    说明: 不存在返回-1。

    示例2:
    输入：words = ["at", "", "", "", "ball", "", "", "car", "", "","dad", "", ""], s = "ball"
    输出：4

    提示:
    words的长度在[1, 1000000]之间

    链接：https://leetcode-cn.com/problems/sparse-array-search-lcci
*/
// TODO: 三刷
/**
 * =============================
 * 二刷
*/
// 有序又提示这么长，就是让你用二分啦
export var findString = function(words, s) {
    let l = 0;
    let r = words.length - 1;
    while (l <= r) {
        while (words[l] === '' && l <= r) l++;
        while (words[r] === '' && l <= r) r--;
    
        let m = l + parseInt((r-l)/2);
        // 这里左移右移都行，重点是上面两个 while，保证再 m 移动完之后，迅速切断 ''，能迅速减小时间，当然，没他俩也没事，也能解决
        while (words[m] === '' && m > l) {
            m--;
            // 并不是退到边上就没了，可能左边全是空，答案在右边，这个时候退出就好了
            // if (m <= l) return -1;
            // 可以等于 l，因为下面的 if else 会给 l + 1 的，没事
            // if (m <= l) break;
            // m++;
        }
        if (words[m] === s) {
            return m;
        } else if (words[m] < s) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return -1;
}

/**
 * =============================
 * 一刷
*/
// m 不空就二分，m 空就线性走，直到不空
// 下面这个巨长的case不过，不是超时，而是结果不对。加上 l 和 r 的缩进就对了，不然在下面这种case， l 侧都空，不缩进会发福捯？
// ["", "", "", "", "AbHSZkLKTnHBbchUaS", "", "", "", "", "", "", "", "", "", "", "", "Ag kFlfSmsAEMy", "", "AsKLCqP", "", "", "", "", "", "AwNHxnNNZG", "", "", "", "", "", "", "", "BPwnIg", "", "CTZVBhsbvQpKHn", "DbWXiVetWyFeDu", "", "", "", "", "DdVm", "", "", "", "", "EIXK", "EUzGOV", "", "FBLOHPrpE", "GHMqgmMCXLkEBgU", "", "HPDGLlVDt", "", "", "", "", "", "", "HfF", "", "", "", "ILzzRaXUzNieYll", "", "", "", "", "", "", "", "", "IXO", "", "", "", "", "JMsO", "", "", "", "", "", "", "", "", "", "", "", "JNqzgSHitHRhdauLMcJ", "", "JZkNLIvaG", "", "", "KwRVFXYVJiueHvDHRTaJ", "", "", "LDTWBS", "", "", "", "", "", "", "LYN", "", "", "", "", "", "", "", "LpgNAXXV cWNYTwxo", "", "", "", "", "", "", "", "", "", "LxWJTErsIjyXjfCqrK", "", "", "", "", "", "", "", "", "MlJUQNiISaxtt", "", "", "", "", "", "", "", "", "", "", "O", "", "", "", "", "", "", "", "OHyIQptaYAfinbkjT", "", "", "", "", "", "", "", "", "", "", "", "OcQIESYXEmdykm", "", "", "", "", "", "", "", "", "Ol utzavtJOrPIK", "", "", "", "", "QLy", "", "", "", "", "", "QQZriWTlYYJgdlWl", "", "", "", "", "", "QhHySgWDIJwFtYP", "", "", "", "", "", "", "", "", "", "QiqwcedXKkVHDulp", "", "", "", "", "", "QtSvWSREnaYrrscc", "RHHeBMEnG nUX", "", "", "", "", "", "", "", "", "", "S", "", "", "", "", "", "", "", "", "", "SoULoFHOumjYMArBdiW", "", "", "", "", "SqHyxrJVNkrNaZG", "", "", "", "", "", "", "", "ThyUiuy", "", "", "Tu ac", "", "", "", "", "", "", "", "", "", "UGoOqhdXVzKl", "", "", "", "", "UbmA", "", "", "", "", "", "", "", "", "", "", "UsJhUmDujiOTntftsx", "", "", "", "", "", "", "", "", "", "", "V", "", "", "", "", "", "", "", "WEHisFZW wgmmVL", "", "", "", "", "", "", "", "", "", "", "", "WayOichMZsXpvJF", "", "WxVmzLgGjGlZOJwdzRd", "", "", "WzMjbVe WqjHOZJi", "", "", "", "", "", "", "", "", "", "", "", "XBVQZDHQT", "", "", "", "", "", "XMnsPtB AuMzDv", "", "XRNgMvqmhfjSfVVOP", "", "", "", "", "", "", "", "", "", "XYNh", "", "", "", "YfT", "", "", "", "", "", "", "", "", "", "", "", "amPIKYDmkUtUtFznRSvy", "", "", "", "", "", "", "", "", "", "bSs H MHwtgkOUzc", "", "", "", "cZhtYPrq ZpxZ", "", "", "", "", "", "", "dUGjmZGq", "e", "", "", "", "", "", "", "", "", "", "eWp", "epctu", "", "", "", "", "", "", "", "", "ezTPGIKrUmY", "", "", "", "", "", "", "", "", "", "", "fDnxFNxYyzUdQLc", "", "", "", "", "", "", "fFq", "", "", "", "", "", "", "", "", "", "", "fVjbEkHHU", "", "", "", "", "", "", "fux", "", "", "", "", "", "", "", "", "", "", "fwNIhmjYGktBo", "", "", "", "", "", "", "gEw", "", "", "hCisHtVxXZLjazN", "", "", "iqtlVbWLc", "", "", "jgLIRdgwDIaXioxoQkJn", "", "jpfhmJLfe", "", "", "", "kJEFz", "", "", "", "", "", "", "", "", "", "", "kKGFNPRtWNMY", "", "", "", "", "", "", "", "kXsm YJ", "", "", "", "kxjNfp c", "", "", "", "", "lnHVOerQcvgQEbBH", "", "", "", "", "", "mBsZUwwGmIsTwBUG", "", "mDMENtWiZwu", "", "miuxyF VvYebav", "", "", "", "", "", "nMWP", "", "", "", "", "", "", "", "", "", "", "", "nVbrbTsffMvICzx", "", "", "", "nYQuyy", "", "neMPLcFrptsISrhXBWe", "", "", "", "", "", "", "", "", "", "oAhJcIL", "", "", "", "", "ptybFCyrvqgy", "", "", "", "qVMPHyOgzIexxZ", "", "", "", "", "", "", "", "qvxuleCVWTYeboMK", "qyJLPQMBUuEEkhI", "", "", "", "", "", "", "", "", "", "", "rOsUPq", "", "", "", "sp v", "tjABXGFKaX", "", "", "", "", "", "", "", "", "uCFtpnikffzpIGynu", "", "", "uUOuBVKFxs", "", "", "", "", "", "", "ukVV", "", "", "", "", "uoRyNsvADRrPlF", "", "", "vJEsAKrSc jrBnvb", "", "", "", "", "", "", "", "", "", "", "wKjM", "", "", "", "", "", "", "", "", "wfWltxcuOFs", "", "", "", "", "", "", "", "wrjXviwslafTEBrLBDcQ", "", "", "", "", "", "", "", "", "", "", "xqhYBOAEpUzGUDG", "", "", "", "", "", "", "", "", "", "", "y", "", "yEvRmNbkvfELjCvG", "", "", "", "", "", "", "z NBqViMo", "", "", "", "zhEOGXTiOsTMbzW", "", "", "", "", "", "zuaVLjhQhNdg"]
export var findString = function(words, s) {
    let n = words.length;
    let l = 0;
    let r = n-1;
    while(l <= r) {
        // 如果 l 和 r 移动的时候超过了彼此的限制，就跳出，记得，
        // 而不是 l < n, r >= 0,这样也能通过，就浪费时间了
        while(words[l] === '' && l <= r) l++;
        while(words[r] === '' && l <= r) r--;

        let m = parseInt((l+r)/2);
        // m 一直加会到右边
        while(m < r && words[m] === '') m++;

        if (words[m] === s) {
            return m;
        } else if (words[m] < s) {
            l = m + 1;
        } else {
            r = m - 1;
        }
    }
    return -1;
};