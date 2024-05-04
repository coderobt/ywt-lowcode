/**
 *  @description 问卷  多行输入
 * */

import Component from './Component'
import { QuestionTextareaDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// Textarea 组件的配置
export default {
  title: '输入框',
  type: 'questionTextarea', //要和后端统一
  Component, //画布显示组件
  PropComponent, //修改属性组件
  defaultProps: QuestionTextareaDefaultProps,
}
