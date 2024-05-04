/**
 *  @description 问卷标题
 * */

import Component from './Component'
import { QuestionTitleDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// Title 组件的配置
export default {
  title: '标题',
  type: 'questionTitle', //要和后端统一
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefaultProps,
}
