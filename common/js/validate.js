
// 用户名
export function isvalidUsername(str) {
    const reg = /^[a-zA-Z0-9]{2,25}$/
    return reg.test(str)
}
// 手机号
export function mobile(str) {
    const reg = /^1[3-9]\d{9}$/;
    return reg.test(str)
}
// 密码
export function isvalidPassword(str) {
    const reg = /^(?![0-9]+$)(?![A-Z]+$)(?![a-z]+$)(?![`~!@#$%^&.*"“”_+<>{}\/'[\]]+$)[0-9|A-Z|a-z|`~!@#$%^&.*_"“”+<>{}\/'[\]]{6,16}$/;
    return reg.test(str)
}
// 数字不能1-255
export function num1to255(str) {
    const reg = /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5]))))$/
    return reg.test(str)
}
// 数字0-999
export function num0to999(str) {
    const reg = /^\+?[0-9]\d{0,2}(\.\d*)?$/
    return reg.test(str)
}
// 数字0-9999
export function num0to9999(str) {
    const reg = /^\+?[0-9]\d{0,3}(\.\d*)?$/
    return reg.test(str)
}
// 数字1-9999
export function num1to9999(str) {
    const reg = /^\+?[1-9]\d{0,3}(\.\d*)?$/
    return reg.test(str)
}
// 数字0-99999
export function num0to99999(str) {
    const reg = /^\+?[0-9]\d{0,4}(\.\d*)?$/
    return reg.test(str)
}
// 数字0-99999999  八位
export function num0to9999999(str) {
    const reg = /^\+?[0-9]\d{0,7}(\.\d*)?$/
    return reg.test(str)
}
// 数字0-999999
export function num0to999999(str) {
    const reg = /^\+?[0-9]\d{0,5}(\.\d*)?$/
    return reg.test(str)
}
// 空或数字0-999999
export function nullto999999(str) {
    const reg = /^(?:[0-9]\d{0,5}|0|)$/
    return reg.test(str)
}
// 金额
export function money(str) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    return reg.test(str)
}
// 0<x<=10,最多两位小数
export function multiple0to10(str) {
    const reg = /^(?!0(\.0{1,2})?$)(\d(\.\d{1,2})?|10)$/;
    return reg.test(str)
}
/* 合法uri*/
export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
    return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
    const reg = /^[a-z]+$/
    return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/
    return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/
    return reg.test(str)
}