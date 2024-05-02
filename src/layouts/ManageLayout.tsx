import React, { FC } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { createQuestionService } from '@/services/question'
import { useRequest } from 'ahooks'

const ManageLayout: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()

  // const [loading, setLoading] = useState(false)
  // async function handleCreateClick() {
  //   setLoading(true)
  //   const data = await createQuestionService()
  //   const { id } = data || {}
  //   if (id) {
  //     nav(`/question/edit/${id}`)
  //     message.success('创建成功')
  //   }
  //   setLoading(false)
  // }
  const {
    loading,
    // error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`)
      message.success('创建成功')
    },
  })

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            disabled={loading}
            onClick={handleCreateClick}
            icon={<PlusOutlined />}
            type="primary"
            size="large"
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            onClick={() => nav('/manage/list')}
            icon={<BarsOutlined />}
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size="large"
          >
            我的问卷
          </Button>
          <Button
            onClick={() => nav('/manage/star')}
            icon={<StarOutlined />}
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size="large"
          >
            星标问卷
          </Button>
          <Button
            onClick={() => nav('/manage/trash')}
            icon={<DeleteOutlined />}
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size="large"
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
