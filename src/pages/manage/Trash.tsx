import React, { FC, useState } from 'react'
import { useTitle, useRequest } from 'ahooks'
import styles from './common.module.scss'
import { Typography, Empty, Table, Tag, Button, Space, Modal, message, Spin } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import ListSearch from '@/components/ListSearch'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import ListPage from '@/components/ListPage'
import { updateQuestionService } from '@/services/question'
import { deleteQuestionService } from '@/services/question'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
  useTitle('小雅问卷-回收站')
  const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list = [], total = 0 } = data
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

  //记录选中id
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  //恢复
  const { run: recover } = useRequest(
    async () => {
      for await (const id of selectedIds) {
        await updateQuestionService(id, { isDeleted: false })
      }
    },
    {
      manual: true,
      debounceWait: 500, //防抖
      onSuccess: () => {
        message.success('恢复成功')
        refresh() // 手动刷新列表
        setSelectedIds([]) //清空选中
      },
    },
  )

  //删除
  const { run: deleteQuestion } = useRequest(async () => await deleteQuestionService(selectedIds), {
    manual: true,
    onSuccess: () => {
      message.success('删除成功')
      refresh() // 手动刷新列表
      setSelectedIds([]) //清空选中
    },
  })

  function del() {
    confirm({
      title: '确认彻底删除该问卷？',
      icon: <ExclamationCircleOutlined />,
      content: '删除后将无法恢复',
      onOk: deleteQuestion,
    })
  }
  const TableElem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" onClick={recover} disabled={selectedIds.length === 0}>
            恢复
          </Button>
          <Button onClick={del} danger disabled={selectedIds.length === 0}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={list}
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
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {list.length > 0 && TableElem}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  )
}

export default Trash
