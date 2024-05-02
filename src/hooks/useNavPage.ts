import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  isLoginOrRegister,
  MANAGE_INDEX_PATHNAME,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
} from '@/router'
import useGetUserInfo from './useGetUserInfo'

function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()

  useEffect(() => {
    if (waitingUserData) return
    // 如果用户已登录，且当前页面是登录或注册页面，则跳转到管理页面
    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME)
      }
      return
    }
    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_PATHNAME)
    }
  }, [waitingUserData, username, pathname])
}

export default useNavPage
