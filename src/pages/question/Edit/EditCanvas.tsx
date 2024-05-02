import React, { FC } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { getComponentConfByType } from '@/components/QuestionComponents/index'
import { ComponentInfoType } from '@/store/componentsReducer'
import { ComponentConfigType } from '@/components/QuestionComponents/index'

//临时静态展示title 和 input 的效果
// import QuestionTitle from '@/components/QuestionComponents/QuestionTitle/Component'
// import QuestionInput from '@/components/QuestionComponents/QuestionInput/Component'

type PropsType = {
  loading: boolean
}

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo

  const componentConf = getComponentConfByType(type)
  if (componentConf === null) return null

  const { Component } = componentConf as ComponentConfigType
  return <Component {...props} />
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo()

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    )
  }

  return (
    <div className={styles.canvas}>
      {componentList.map(c => {
        const { fe_id } = c
        return (
          <div key={fe_id} className={styles['component-wrapper']}>
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        )
      })}
      {/* <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionTitle />
        </div>
      </div>
      <div className={styles['component-wrapper']}>
        <div className={styles.component}>
          <QuestionInput />
        </div>
      </div> */}
    </div>
  )
}

export default EditCanvas
