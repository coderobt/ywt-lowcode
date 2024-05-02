import { useSelector } from 'react-redux'
import type { StateType } from '@/store'
import { UserStateType } from '@/store/userReducer'

function userGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(state => state.user) as UserStateType
  return { username, nickname }
}

export default userGetUserInfo
