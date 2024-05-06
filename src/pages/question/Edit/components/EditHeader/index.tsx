import React, { FC, useState, ChangeEvent } from 'react'
import styles from './index.module.scss'
import { Button, Typography, Space, Input } from 'antd'
import { LeftOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import EditToolbar from '../EditToolbar'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { useDispatch } from 'react-redux'
import { changePageTitle } from '@/store/pageInfoReducer'
import { updateQuestionService } from '@/services/question'
import { useRequest, useKeyPress } from 'ahooks'

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

// 保存按钮
const SaveButton: FC = () => {
  //pageInfo componentList
  const { id } = useParams()
  const { componentList = [] } = useGetComponentInfo()
  const pageInfo = useGetPageInfo()

  const { loading, run: save } = useRequest(
    async () => {
      if (!id) return
      await updateQuestionService(id, { ...pageInfo, componentList })
    },
    { manual: true },
  )

  //快捷键保存
  useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
    //禁用默认行为
    event.preventDefault()
    if (!loading) save()
  })

  return (
    //给按钮加loading 防止重复点击
    <Button onClick={save} disabled={loading} icon={loading ? <LoadingOutlined /> : null}>
      保存
    </Button>
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
            <SaveButton />
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
