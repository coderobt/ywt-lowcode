import { ComponentInfoType, ComponentsStateType } from './index'

// 获取下一个选中的组件id
export function getNextSelectedId(fe_id: string, componentList: Array<ComponentInfoType>) {
  const visibleComponentList = componentList.filter(item => !item.isHidden)
  const index = visibleComponentList.findIndex(item => item.fe_id === fe_id)

  if (index < 0) {
    return ''
  }

  // 重新计算selectedId
  let newSelectedId = ''
  const length = visibleComponentList.length
  if (length <= 1) {
    // 组件长度就一个，被删除了，就没有组件
    newSelectedId = ''
  } else {
    // 组件长度>1
    if (index + 1 === length) {
      // 删除的是最后一个,就要选中上一个
      newSelectedId = visibleComponentList[index - 1].fe_id
    } else {
      // 删除的不是最后一个，就选中下一个
      newSelectedId = visibleComponentList[index + 1].fe_id
    }
  }
  return newSelectedId
}

/**
 * 插入新组件
 *@param draft state
 * @param newComponent 新组件
 */
export function insertNewComponent(draft: ComponentsStateType, newComponent: ComponentInfoType) {
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
}
