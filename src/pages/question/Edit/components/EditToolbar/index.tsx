import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  BlockOutlined,
  CopyOutlined,
  LockOutlined,
} from '@ant-design/icons'
import {
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLock,
  copySelectedComponent,
  pasteCopiedComponent,
} from '@/store/componentsReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}

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
    </Space>
  )
}

export default EditToolbar
