import React, { FC, useState, ChangeEvent } from 'react'
import styles from './index.module.scss'
import { Button, Typography, Space, Input } from 'antd'
import { LeftOutlined, EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import EditToolbar from '../EditToolbar'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '@/store/pageInfoReducer'

const { Title } = Typography

// 显示和修改标题
const TitleElem: FC = () => {
  const { title } = useGetPageInfo()
  const dispatch = useDispatch()

  const [changeTitle, setChangeTitle] = useState(false)

  function handleTitleChange(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    dispatch(changePageTitle(newTitle))
  }

  if (changeTitle) {
    return (
      <Input
        value={title}
        onChange={handleTitleChange}
        onPressEnter={() => setChangeTitle(false)}
        onBlur={() => setChangeTitle(false)}
      />
    )
  }

  return (
    <>
      <Space>
        <Title>{title}</Title>
        <Button
          size="small"
          shape="circle"
          type="text"
          icon={<EditOutlined />}
          onClick={() => setChangeTitle(true)}
        />
      </Space>
    </>
  )
}

// 编辑器头部
const EditHeader: FC = () => {
  const nav = useNavigate()
  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button onClick={() => nav(-1)} type="link" icon={<LeftOutlined />}>
              返回
            </Button>
            <TitleElem />
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button>保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
