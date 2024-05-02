//专门存储组件列表数据
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '@/components/QuestionComponents'

export type ComponentInfoType = {
  fe_id: string //TODO 后面解释
  type: string //组件类型
  title: string //组件标题
  props: ComponentPropsType //组件属性
}

export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  componentList: [],
  //其他扩展
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    //重置所有组件
    resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload
    },
  },
})

export const { resetComponents } = componentsSlice.actions

export default componentsSlice.reducer
