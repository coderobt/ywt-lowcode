import React, { FC } from 'react'
import { QuestionCheckboxPropsType } from './interface'
import { Typography, Space, Checkbox } from 'antd'

const { Paragraph } = Typography

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const { title, isVertical, list = [] } = props

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map(opt => {
          const { value, text, checked } = opt
          return (
            <Checkbox checked={checked} key={value} value={value}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default Component
