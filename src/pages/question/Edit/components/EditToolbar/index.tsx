import React, { FC } from 'react'
import { Space, Button, Tooltip } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { removeSelectedComponent } from '@/store/componentsReducer'
import { useDispatch } from 'react-redux'

const EditToolbar: FC = () => {
  const dispatch = useDispatch()

  function handleDelete() {
    dispatch(removeSelectedComponent())
  }

  return (
    <Space>
      <Tooltip title="删除">
        <Button onClick={handleDelete} shape="circle" icon={<DeleteOutlined />}></Button>
      </Tooltip>
    </Space>
  )
}

export default EditToolbar
