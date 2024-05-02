// 定义组件需要的属性类型以及默认需要的属性是什么
export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
}

export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '一行标题',
  level: 1,
  isCenter: false,
}
