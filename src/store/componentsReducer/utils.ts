import { ComponentInfoType } from './index'

export function getNextSelectedId(fe_id: string, componentList: Array<ComponentInfoType>) {
  const index = componentList.findIndex(item => item.fe_id === fe_id)

  if (index < 0) {
    return ''
  }

  // 重新计算selectedId
  let newSelectedId = ''
  const length = componentList.length
  if (length <= 1) {
    // 组件长度就一个，被删除了，就没有组件
    newSelectedId = ''
  } else {
    // 组件长度>1
    if (index + 1 === length) {
      // 删除的是最后一个,就要选中上一个
      newSelectedId = componentList[index - 1].fe_id
    } else {
      // 删除的不是最后一个，就选中下一个
      newSelectedId = componentList[index + 1].fe_id
    }
  }
  return newSelectedId
}
