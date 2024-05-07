import React, { FC, useRef } from 'react'
import styles from './index.module.scss'
import { Button, Typography, Space, Input, Tooltip, message, Popover } from 'antd'
import useGetPageInfo from '@/hooks/useGetPageInfo'
import { LeftOutlined, CopyOutlined, QrcodeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import type { InputRef } from 'antd'
import QRCode from 'qrcode.react'

const { Title } = Typography

const StatHeader: FC = () => {
  const nav = useNavigate()
  const { id } = useParams()
  const { title, isPublished } = useGetPageInfo()

  // 拷贝链接
  const urlInputRef = useRef<InputRef>(null)
  function copy() {
    const elem = urlInputRef.current
    if (elem == null) return
    elem.select() //选中 input 的内容
    document.execCommand('copy') // 拷贝选中内容
    message.success('拷贝成功')
  }

  function genLinkAndQRCodeElem() {
    if (!isPublished) return null

    //拼接url 需要参考 C端的规则
    const url = `http://localhost:3000/question/${id}`

    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} size={150} />
      </div>
    )

    return (
      <Space>
        <Input ref={urlInputRef} value={url} style={{ width: '300px' }} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    )
  }

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button onClick={() => nav(-1)} type="link" icon={<LeftOutlined />}>
              返回
            </Button>
            <Title>{title}</Title>
          </Space>
        </div>
        <div className={styles.main}>{genLinkAndQRCodeElem()}</div>
        <div className={styles.right}>
          <Button type="primary" onClick={() => nav(`/question/edit/${id}`)}>
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  )
}

export default StatHeader
