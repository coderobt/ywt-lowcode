/**
 * @description 问卷 - 段落
 */

import Component from './Component'
import { QuestionParagraphDefaultProps } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

// Paragraph 组件的配置
export default {
  title: '段落',
  type: 'questionParagraph', //要和后端统一
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
}
