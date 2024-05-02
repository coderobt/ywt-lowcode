import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '@/services/user'
import { useDispatch } from 'react-redux'
import userGetUserInfo from './useGetUserInfo'
import { loginReducer } from '@/store/userReducer'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)

  const dispatch = useDispatch()

  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally() {
      setWaitingUserData(false)
    },
  })

  // 判断当前 redux store 是否已经存在用户信息
  const { username } = userGetUserInfo()
  useEffect(() => {
    if (username) {
      // 如果已经存在用户信息，直接返回
      setWaitingUserData(false)
      return
    }
    run() // 如果不存在用户信息，调用接口获取
  }, [username])

  // ajax加载完用户信息之后，放在redux中，不用返回
  return { waitingUserData }
}

export default useLoadUserData
