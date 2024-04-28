import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import styles from './common.module.scss'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const rawQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: '3月10日 13:23',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: false,
    answerCount: 3,
    createdAt: '3月11日 13:23',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: true,
    isStar: false,
    answerCount: 6,
    createdAt: '3月12日 13:23',
  },
]
const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('小雅问卷-回收站')
  const [questionList, setQuestionList] = useState(rawQuestionList)
  const tableColumns = [
    { title: '标题', dataIndex: 'title', key: 'title' },
    //key: 'title', 循环列的key ，它默认会取 dataIndex 的值，如果没有 dataIndex，就会取 key 的值
    {
      title: '是否发布',
      dataIndex: 'isPublished',
      key: 'isPublished',
      render: (isPublished: boolean) => {
        return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
      },
    },
    { title: '答卷', dataIndex: 'answerCount', key: 'answerCount' },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
  ]
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复',
      onOk: () => {
        message.success('删除成功')
      },
    })
  }
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button onClick={del} danger disabled={selectedIds.length === 0}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectRowKeys => {
            setSelectedIds(selectRowKeys as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>(搜索)</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElem}
      </div>
    </>
  )
}

export default Trash
