import React, { FC } from 'react'
import { Space, Typography } from 'antd'
import { FormOutlined } from '@ant-design/icons'
const { Title } = Typography
import styles from './Logo.module.scss'
import { Link } from 'react-router-dom'

const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小雅问卷</Title>
        </Space>
      </Link>
    </div>
  )
}

export default Logo
