import React, { FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { changeSelectedId, changeComponentTitle } from '@/store/componentsReducer'
import styles from './index.module.scss'
import { message, Input } from 'antd'

const Layers: FC = () => {
  const { componentList, selectedId } = useGetComponentInfo()
  const dispatch = useDispatch()

  //记录当前正在修改标题的组件
  const [changeTitleId, setChangeTitleId] = useState('')

  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp && curComp.isHidden) {
      message.info('不能选中隐藏的组件')
    }
    if (fe_id !== selectedId) {
      //当前组件未被选中 执行选中
      dispatch(changeSelectedId(fe_id))
      setChangeTitleId('')
      return
    }

    //点击修改标题
    setChangeTitleId(fe_id)
  }

  //修改标题
  function changeTitle(event: ChangeEvent<HTMLInputElement>) {
    const newTitle = event.target.value.trim()
    if (!newTitle) return
    if (!selectedId) return

    //修改标题的前提，首先是选中
    dispatch(changeComponentTitle({ fe_id: selectedId, title: newTitle }))
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
              {fe_id === changeTitleId && (
                <Input
                  onBlur={() => setChangeTitleId('')}
                  onPressEnter={() => setChangeTitleId('')}
                  value={title}
                  onChange={changeTitle}
                />
              )}
              {fe_id !== changeTitleId && title}
            </div>
            <div className={styles.handler}>按钮</div>
          </div>
        )
      })}
    </>
  )
}

export default Layers
