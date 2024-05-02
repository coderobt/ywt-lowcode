import React, { FC, useState } from 'react'
import styles from './QuestionCard.module.scss'
import { Button, Space, Divider, Tag, Popconfirm, Modal, message } from 'antd'
import { Link } from 'react-router-dom'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { updateQuestionService, duplicateQuestionService } from '../services/question'
import { useRequest } from 'ahooks'

const { confirm } = Modal

type PropsType = {
  _id: string
  title: string
  isStar: boolean
  isPublished: boolean
  answerCount: number
  createdAt: string
}

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate()
  const { _id, title, createdAt, isPublished, answerCount, isStar } = props

  //修改标星
  const [isStarState, setIsStarState] = useState(isStar)
  const { run: changeStar, loading: changeStarLoading } = useRequest(
    async () => {
      await updateQuestionService(_id, { isStar: !isStarState })
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStarState(!isStarState) //更新state
        message.success('已更新')
      },
    },
  )

  // function duplicate() {
  //   message.success('执行复制')
  // }

  //复制
  const { run: duplicate, loading: duplicateLoading } = useRequest(
    async () => {
      const data = await duplicateQuestionService(_id)
      return data
    },
    {
      manual: true,
      onSuccess: result => {
        message.success('复制成功')
        nav(`/question/edit/${result.id}`) //跳转到问卷编辑页
      },
    },
  )

  //删除
  const [isDeletedState, setIsDeletedState] = useState(false)
  const { run: deleteQuestion, loading: delLoading } = useRequest(
    async () => {
      await updateQuestionService(_id, { isDeleted: true })
    },
    {
      manual: true,
      onSuccess: () => {
        message.success('删除成功')
        setIsDeletedState(true)
      },
    },
  )

  function del() {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      onOk: deleteQuestion,
    })
  }

  //已经删除的问卷不要在渲染卡片了
  if (isDeletedState) return null

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>答卷:{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <div className={styles['button-container']}>
        <div className={styles.left}>
          <Space>
            <Button
              onClick={() => nav(`/question/edit/${_id}`)}
              icon={<EditOutlined />}
              type="text"
              size="small"
            >
              编辑问卷
            </Button>
            <Button
              onClick={() => nav(`/question/stat/${_id}`)}
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              disabled={changeStarLoading}
              onClick={changeStar}
              icon={<StarOutlined />}
              type="text"
              size="small"
            >
              {isStarState ? '取消标星' : '标星'}
            </Button>
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button disabled={duplicateLoading} icon={<CopyOutlined />} type="text" size="small">
                复制
              </Button>
            </Popconfirm>
            <Button
              disabled={delLoading}
              onClick={del}
              icon={<DeleteOutlined />}
              type="text"
              size="small"
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
