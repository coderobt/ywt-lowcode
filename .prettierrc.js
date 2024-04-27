module.exports = {
  // 箭头函数只有一个参数的时候可以忽略括号
  arrowParens: 'avoid',
  // 括号内部不要出现空格
  bracketSpacing: true,
  // 行结束符使用Unix 格式
  endOfLine: 'lf',
  // true: Put > on the last line instead of at a new line
  jsxBracketSameLine: false,
  // 行宽
  printWidth: 100,
  // 换行方式
  proseWrap: 'preserve',
  // 分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 缩进
  tabWidth: 2,
  // 使用 tab 缩进
  useTabs: false,
  // 后置逗号，多行对象、数组在最后一行增加逗号
  parser: 'typescript',
}

// module.exports = {
//   // 一行的字符数，如果超过会进行换行，默认为80
//   printWidth: 100,
//   // 行位是否使用分号，默认为true
//   semi: true,
//   // 字符串是否使用单引号，默认为false，使用双引号
//   singleQuote: true,
//   // 一个tab代表几个空格数，默认为2
//   tabWidth: 2,
//   // 是否使用尾逗号，有三个可选值"<none|es5|all>"
//   trailingComma: "none",
// };
