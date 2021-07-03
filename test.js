// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
/**
 * 幫數值加上千分位
 * @param {number} n 
 * @param {boolean} includeDecimal 是否處理小數點以後的
 */
function addComma(n, includeDecimal = false) {
  return includeDecimal
    ? n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : n.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
}

console.log('@@@ 第一題 加千分位 @@@')
let testCases = [123456, -123456, 123456.78987, 0, 12]
console.log('--- 不處理小數點後的版本 ---')
testCases.forEach(d => console.log(addComma(d)))
console.log('--- 處理小數點後的版本 ---')
testCases.forEach(d => console.log(addComma(d, true)))

/**
 * @param {any} 初始值
 * @param {function} 後面可以傳入無數個要執行的 function 
 * 效果範例
 * pipe(5, increment) => 6
 * pipe(5, increment, increment, increment) => 8
 */
function pipe() {
  let [val, ...funcArr] = arguments
  return funcArr.reduce((acc, cur) => cur(acc), val)
}

console.log('@@@ 第二題 pipe @@@')
console.log('--- val 是數值的情況 ---')
console.log('pipe(5, increment)', pipe(5, increment))
console.log('pipe(5, increment, increment, increment)', pipe(5, increment, increment, increment))

console.log('--- val 是 object 的情況 ---')
console.log('pipe({foo:123}, addProp)', pipe({ foo: 123 }, addProp))
console.log('pipe({foo:123}, addProp, addProp, addProp)', pipe({ foo: 123 }, addProp, addProp, addProp))

// 以下是用來測試的 function 
function increment(n) {
  return ++n
}

function addProp(obj) {
  // key 用亂數產生比較好看出 function 真的有被執行多次
  let key = makeId(6)
  obj[key] = 'test data'
  return obj
}

function makeId(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0;i < length;i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

