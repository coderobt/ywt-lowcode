import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { DeleteOutlined, EyeInvisibleOutlined } from '@ant-design/icons'
import { removeSelectedComponent, changeComponentHidden } from '@/store/componentsReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectedId } = useGetComponentInfo()

  //删除组件
  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  // 隐藏组件
  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }))
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button onClick={handleDelete} shape="circle" icon={<DeleteOutlined />}></Button>
      </Tooltip>
      <Tooltip title="隐藏">
        <Button onClick={handleHidden} shape="circle" icon={<EyeInvisibleOutlined />}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
