//专门存储组件列表数据
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '@/components/QuestionComponents'
import { produce } from 'immer'
import { getNextSelectedId, insertNewComponent } from './utils'
import cloneDeep from 'lodash.clonedeep'
import { nanoid } from 'nanoid'

export type ComponentInfoType = {
  fe_id: string // 此处fe_id 因为前端生成的id ,服务端Mongodb不认这种格式，所以自定义fe_id
  type: string //组件类型
  title: string //组件标题
  isHidden?: boolean //是否隐藏
  isLocked?: boolean //是否锁定
  props: ComponentPropsType //组件属性
}

export type ComponentsStateType = {
  selectedId: string //当前选中的组件id
  componentList: Array<ComponentInfoType>
  //其他扩展
  copiedComponent: ComponentInfoType | null //复制的组件
}

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  //其他扩展
  copiedComponent: null,
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

        insertNewComponent(draft, newComponent)
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

    //隐藏/显示 组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        const { componentList } = draft
        const { fe_id, isHidden } = action.payload

        // 重新计算selectedId
        let newSelectedId = ''
        if (isHidden) {
          //要隐藏
          newSelectedId = getNextSelectedId(fe_id, componentList)
        } else {
          //要显示
          newSelectedId = fe_id
        }
        draft.selectedId = newSelectedId

        const curComp = componentList.find(item => item.fe_id === fe_id)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      },
    ),

    // 锁定/解锁组件
    toggleComponentLock: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        const { componentList } = draft
        const { fe_id } = action.payload

        const curComp = componentList.find(item => item.fe_id === fe_id)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      },
    ),

    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const curComp = componentList.find(item => item.fe_id === selectedId)

      if (curComp == null) return
      // 此处使用深拷贝,把组件的所有属性都拷贝
      // 使用lodash.clonedeep中的cloneDeep方法，可以实现深拷贝
      draft.copiedComponent = cloneDeep(curComp) //深拷贝
    }),

    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft
      if (copiedComponent == null) return

      // 要把 fe_id 给修改了 !!id不能重复
      copiedComponent.fe_id = nanoid()

      //插入这个 copiedComponent
      insertNewComponent(draft, copiedComponent)
    }),

    // 选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)

      if (selectedIndex < 0) return //未选中组件
      if (selectedIndex <= 0) return //已经选中第一个了，无法向上选中

      draft.selectedId = componentList[selectedIndex - 1].fe_id
    }),

    // 选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft
      const selectedIndex = componentList.findIndex(item => item.fe_id === selectedId)

      if (selectedIndex < 0) return //未选中组件
      if (selectedIndex + 1 === componentList.length) return //已经选中最后一个了，无法向下选中

      draft.selectedId = componentList[selectedIndex + 1].fe_id
    }),
  },
})

export const {
  resetComponents,
  removeSelectedComponent,
  changeComponentProps,
  changeSelectedId,
  addComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} = componentsSlice.actions

export default componentsSlice.reducer
