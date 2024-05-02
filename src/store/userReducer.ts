import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserStateType = {
  username: string
  nickname: string
}

const INIT_STATE: UserStateType = { username: '', nickname: '' }

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer(state: UserStateType, action: PayloadAction<UserStateType>) {
      return action.payload //设置 username nickname 到 redux store中
    },
    logoutReducer: () => INIT_STATE, //清空redux store中的 username nickname
  },
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
