/**
 *  @description 问卷输入框组件
 * */

import Component from './Component'
import { QuestionInputDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// Input 组件的配置
export default {
  title: '输入框',
  type: 'questionInput', //要和后端统一
  Component, //画布显示组件
  PropComponent, //修改属性组件
  defaultProps: QuestionInputDefaultProps,
}
