import React, { FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LOGIN_PATHNAME } from '@/router'
import { UserOutlined } from '@ant-design/icons'
// import { getUserInfoService } from '@/services/user'
// import { useRequest } from 'ahooks'
import { Button, message } from 'antd'
import { removeToken } from '@/utils/user-token'
import userGetUserInfo from '@/hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '@/store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  // const { data } = useRequest(getUserInfoService)
  // const { username, nickname } = data || {}
  const { username, nickname } = userGetUserInfo()
  const dispatch = useDispatch()

  const logout = () => {
    removeToken() //清除 token的存储
    dispatch(logoutReducer()) //清除redux中的用户信息
    message.success('退出成功')
    nav(LOGIN_PATHNAME)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button onClick={logout} type="link">
        退出登录
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>
  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
