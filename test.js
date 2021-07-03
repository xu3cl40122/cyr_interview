// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
function addComma(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

let testCases = [123456, -123456, 123456.78987, 0, 12]
// testCases.forEach(d => console.log(addComma(d)))


function pipe() {
  let [val, ...funcArr] = arguments
  console.log(val)
  return funcArr.reduce((acc, cur) => cur(acc), val)
}

function increment(n) {
  console.log('do increment', n)
  return ++n
}

function addProp(obj) {
  obj['name'] = 'my name'
  return obj
}

let raw = {foo: '123'}

let ans = pipe(raw, addProp, addProp)
console.log('ans', ans)