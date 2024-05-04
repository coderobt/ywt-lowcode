//专门存储组件列表数据
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '@/components/QuestionComponents'
import { produce } from 'immer'
import { getNextSelectedId } from './utils'

export type ComponentInfoType = {
  fe_id: string // 此处fe_id 因为前端生成的id ,服务端Mongodb不认这种格式，所以自定义fe_id
  type: string //组件类型
  title: string //组件标题
  props: ComponentPropsType //组件属性
}

export type ComponentsStateType = {
  selectedId: string //当前选中的组件id
  componentList: Array<ComponentInfoType>
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
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

    // 修改selectedId
    changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.selectedId = action.payload
    }),

    // 添加新组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const newComponent = action.payload

        const { selectedId, componentList } = draft
        const index = componentList.findIndex(item => item.fe_id === selectedId)

        // 选中了组件，插入到 index 后面
        if (index !== -1) {
          componentList.splice(index + 1, 0, newComponent)
        } else {
          //未选中任何组件，直接添加到最后
          componentList.push(newComponent)
        }

        draft.selectedId = newComponent.fe_id
      },
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
      ) => {
        const { fe_id, newProps } = action.payload
        // 当前要修改属性的组件
        const curComp = draft.componentList.find(item => item.fe_id === fe_id)
        if (curComp) {
          curComp.props = { ...curComp.props, ...newProps }
        }
      },
    ),

    // 删除选中组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId: removeId, componentList = [] } = draft

      // 重新计算selectedId
      const newSelectedId = getNextSelectedId(removeId, componentList)
      draft.selectedId = newSelectedId

      const index = componentList.findIndex(item => item.fe_id === removeId)
      componentList.splice(index, 1)
    }),
  },
})

export const {
  resetComponents,
  removeSelectedComponent,
  changeComponentProps,
  changeSelectedId,
  addComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
