import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import {
  removeSelectedComponent,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
} from '@/store/componentsReducer'

/**
 * 判断 activeElem 是否合法
 */
function isActiveElementValid() {
  const activeElem = document.activeElement

  if (activeElem === document.body) return true //光标没有 focus 到input等元素上

  return false
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch()

  //删除组件]
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return
    dispatch(removeSelectedComponent())
  })

  // 复制
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementValid()) return
    dispatch(copySelectedComponent())
  })

  // 粘贴
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementValid()) return
    dispatch(pasteCopiedComponent())
  })

  // 选中上一个
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectPrevComponent())
  })

  // 选中下一个
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid()) return
    dispatch(selectNextComponent())
  })

  //TODO 撤销 重做
}

export default useBindCanvasKeyPress
