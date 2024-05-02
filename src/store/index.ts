import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'

export type StateType = {
  user: UserStateType
  components: ComponentsStateType
}

export default configureStore({
  reducer: {
    user: userReducer,
    //分模块, 扩展：问卷的信息,组件的信息
    components: componentsReducer,
  },
})
