import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitlePropsType, QuestionTitleDefaultProps } from './interface'

const { Title } = Typography

const QuestionTitle: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProps, ...props }

  const genFontSize = (level: number) => {
    if (level === 1) return '24px'
    if (level === 2) return '20px'
    if (level === 3) return '16px'
    return '16px'
  }

  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'start',
          fontSize: genFontSize(level),
          marginBottom: '0',
        }}
      >
        {text}
      </Title>
    </div>
  )
}

export default QuestionTitle
