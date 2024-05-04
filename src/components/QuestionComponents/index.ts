import QuestionInputConfig, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConfig, { QuestionTitlePropsType } from './QuestionTitle'
import type { FC } from 'react'

//统一,各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 统一,组件的配置
export type ComponentConfigType = {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部的组件配置的列表
const componentConfigList: ComponentConfigType[] = [QuestionInputConfig, QuestionTitleConfig]

// 组件分组
export const componentConfGroup = [
  {
    groupId: 'text',
    groupName: '文本显示',
    components: [QuestionTitleConfig],
  },
  {
    groupId: 'input',
    groupName: '用户输入',
    components: [QuestionInputConfig],
  },
]

export function getComponentConfByType(type: string) {
  return componentConfigList.find(item => item.type === type)
}
