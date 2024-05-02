/**
 *  @description 问卷输入框组件
 * */

import Component from './Component'
import { QuestionInputDefaultProps } from './interface'

export * from './interface'

// Input 组件的配置
export default {
  title: '输入框',
  type: 'questionInput', //要和后端统一
  Component,
  defaultProps: QuestionInputDefaultProps,
}
