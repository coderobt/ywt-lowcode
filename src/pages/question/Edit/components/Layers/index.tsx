import React, { FC, useState, ChangeEvent } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import {
  changeSelectedId,
  changeComponentTitle,
  changeComponentHidden,
  toggleComponentLock,
  moveComponent,
} from '@/store/componentsReducer'
import styles from './index.module.scss'
import { message, Input, Button, Space } from 'antd'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import SortableContainer from '@/components/DragSortable/SortableContainer'
import SortableItem from '@/components/DragSortable/SortableItem'

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

  // 切换 隐藏/显示
  function changeHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }

  // 切换 锁定/解锁
  function changeLocked(fe_id: string) {
    dispatch(toggleComponentLock({ fe_id }))
  }

  // SortableContainer 组件的 items属性，需要每个item都有id属性
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })

  //拖拽排序结束
  function handleDragEnd(oldIndex: number, newIndex: number) {
    dispatch(moveComponent({ oldIndex, newIndex }))
  }

  return (
    <SortableContainer onDragEnd={handleDragEnd} items={componentListWithId}>
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
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
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
              <div className={styles.handler}>
                <Space>
                  <Button
                    onClick={() => changeHidden(fe_id, !isHidden)}
                    size="small"
                    shape="circle"
                    className={!isHidden ? styles.btn : ''}
                    type={isHidden ? 'primary' : 'text'}
                    icon={<EyeInvisibleOutlined />}
                  ></Button>
                  <Button
                    onClick={() => changeLocked(fe_id)}
                    size="small"
                    shape="circle"
                    className={!isLocked ? styles.btn : ''}
                    type={isLocked ? 'primary' : 'text'}
                    icon={<LockOutlined />}
                  ></Button>
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}

export default Layers
