import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'

const QuestionLayout: FC = () => {
  return (
    <>
      <div>Question Layout</div>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default QuestionLayout
