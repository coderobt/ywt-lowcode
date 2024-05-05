import React, { FC } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { changeSelectedId } from '@/store/componentsReducer'
import styles from './index.module.scss'
import { message } from 'antd'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
    }
    if (fe_id !== selectedId) {
      //执行选中
      dispatch(changeSelectedId(fe_id))
      return
    }
  }

  return (
    <>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c

        //拼接titleClassName
        const titleDefaultClassName = styles.title
        const selectedClassName = styles.selected
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === selectedId,
        })

        return (
          <div key={fe_id} className={styles.wrapper}>
            <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
              {title}
            </div>
            <div className={styles.handler}>按钮</div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
