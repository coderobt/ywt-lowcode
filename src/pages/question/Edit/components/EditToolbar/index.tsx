import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  BlockOutlined,
  CopyOutlined,
  LockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined,
} from '@ant-design/icons'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
  moveComponent,
} from '@/store/componentsReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { ActionCreators as UndoActionCreators } from 'redux-undo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const length = componentList.length
  const selectedIndex = componentList.findIndex(c => c.fe_id === selectedId)
  const isFirst = selectedIndex <= 0
  const isLast = selectedIndex + 1 >= length

  //删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  // 锁定组件
  function handleLock() {
    dispatch(toggleComponentLock({ fe_id: selectedId }))
  }

  //复制组件
  function copy() {
    dispatch(copySelectedComponent())
  }

  //粘贴组件
  function paste() {
    dispatch(pasteCopiedComponent())
  }

  // 上移
  function moveUp() {
    if (isFirst) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
  }

  //下移
  function moveDown() {
    if (isLast) return
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
  }

  // 撤销
  function undo() {
    dispatch(UndoActionCreators.undo())
  }

  // 重做
  function redo() {
    dispatch(UndoActionCreators.redo())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button onClick={handleDelete} shape="circle" icon={<DeleteOutlined />}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button onClick={handleHidden} shape="circle" icon={<EyeInvisibleOutlined />}></Button>
      </Tooltip>
      <Tooltip title="锁定">
        <Button
          type={isLocked ? 'primary' : 'default'}
          onClick={handleLock}
          shape="circle"
          icon={<LockOutlined />}
        ></Button>
      </Tooltip>
      <Tooltip title="复制">
        <Button onClick={copy} shape="circle" icon={<CopyOutlined />}></Button>
      </Tooltip>
      <Tooltip title="粘贴">
        <Button
          disabled={copiedComponent == null}
          onClick={paste}
          shape="circle"
          icon={<BlockOutlined />}
        ></Button>
      </Tooltip>
      <Tooltip title="上移">
        <Button disabled={isFirst} onClick={moveUp} shape="circle" icon={<UpOutlined />}></Button>
      </Tooltip>
      <Tooltip title="下移">
        <Button
          disabled={isLast}
          onClick={moveDown}
          shape="circle"
          icon={<DownOutlined />}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销">
        <Button onClick={undo} shape="circle" icon={<UndoOutlined />}></Button>
      </Tooltip>
      <Tooltip title="重做">
        <Button onClick={redo} shape="circle" icon={<RedoOutlined />}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
