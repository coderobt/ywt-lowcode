import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_PATHNAME } from '@/router'

const UserInfo: FC = () => {
  // 对于未登录的用户 显示登录点击跳转到登录页面
  return (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  )
}

export default UserInfo
