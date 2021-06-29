/* 正则表达式 */
const phone = /^(1[0-9])\d{9}$/ //手机号码
const tel = /^(0\d{2,3})-?(\d{7,8})$/ //座机
const email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/ //邮箱
const idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/ //身份证号码

export { phone, tel, email, idCard }
