加上开始和结束标签，这样程序才知道需要在哪个区间生成打印信息：

```js
// start-say-bug

const arr = []
let b = 2
arr = list.map(it => it.name)
const sum = sumFunc(1, 2)

// end-say-bug
```

由于有赋值动作，以上四条语句会变成这样：

```js
const arr = []
console.log(arr)
let b = 2
console.log(b)
arr = list.map(it => it.name)
console.log(arr)
const sum = sumFunc(1, 2)
console.log(sum)

```

没有赋值动作的语句不受影响，因此如`for`循环，`while`循环、`if`判断这几类情况，不会生成打印信息：

```js
// start-say-bug
if(a > 1) {
  // 不打印语句
	b = 1;
  console.log(b)
}
// end-say-bug

// start-say-bug
function func(a) {
  // 不打印语句
	a = 1;
  console.log(a)
}
// end-say-bug
```

对于某些修改动作，也做了支持，毕竟他们在一定程度上修改了变量，如`.push()`、`.splice()`、`trim()`:

```js
// start-say-bug
arr.push(1)
console.log(arr)
// end-say-bug
```

