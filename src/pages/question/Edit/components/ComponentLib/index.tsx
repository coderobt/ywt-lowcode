import React, { FC } from 'react'
import { componentConfGroup } from '@/components/QuestionComponents'
import { Typography } from 'antd'
import { ComponentConfigType } from '@/components/QuestionComponents'
import styles from './index.module.scss'
import { addComponent } from '@/store/componentsReducer'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'

const { Title } = Typography

function genComponent(c: ComponentConfigType) {
  const { title, type, Component, defaultProps } = c
  const dispatch = useDispatch()

  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(), //前端生成的id
        title,
        type,
        props: defaultProps,
      }),
    )
  }

  return (
    <div key={type} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

const Lib: FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map(c => genComponent(c))}</div>
          </div>
        )
      })}
    </>
  )
}

export default Lib
