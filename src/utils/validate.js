// 正则表达式
// 手机号
export function isPhone(val) {
  return /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/.test(val)
}
// 身份证
export function isIdCard(val) {
  return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)
}
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
export function isEmail(path) {
  return /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/.test(path)
}