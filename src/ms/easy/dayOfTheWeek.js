/* 
1185. 一周中的第几天 
给你一个日期，请你设计一个算法来判断它是对应一周中的哪一天。
输入为三个整数：day、month 和 year，分别表示日、月、年。
您返回的结果必须是这几个值中的一个 {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"}。

示例 1：
输入：day = 31, month = 8, year = 2019
输出："Saturday"

示例 2：
输入：day = 18, month = 7, year = 1999
输出："Sunday"

示例 3：
输入：day = 15, month = 8, year = 1993
输出："Sunday"
 
提示：
给出的日期一定是在 1971 到 2100 年之间的有效日期。

链接：https://leetcode-cn.com/problems/day-of-the-week
*/
/**
 * @param {number} day
 * @param {number} month
 * @param {number} year
 * @return {string}
 */
//1971 01 01 friday 
// 1972 是第一个闰年
var dayOfTheWeek = function(day, month, year) {
    let date = ["Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    let days = getDaysOfYears(year) + getDaysOfCurrentYear(day, month, year);
    return date[days%7];
};

function getDaysOfCurrentYear(day, month, year) {
    let commonDaysOfMonth = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    };
    let preMonthDays = 0
    for (let i = 1; i < month; i++) {
        preMonthDays += commonDaysOfMonth[i];
    }

    let isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    if (isLeap && month > 2) {
        preMonthDays += 1;
    }

    // 为什么要减 1： 因为数组索引从 0 开始，1971.01.01 是 Friday，但是对应到数组里是 0 是 Friday
    // 或者说计算的是距离 1 号的天数， 1 不算
    return preMonthDays + day - 1;
}

function getDaysOfYears(year) {
    let years = year - 1971;
    let leapYear = 0;
    if (year < 1973) {
        leapYear = 0;
    } else {
        leapYear = parseInt((year - 1973) / 4) + 1;;
    }
    return years * 365 + leapYear;
}
