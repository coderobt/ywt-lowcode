import React, { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import styles from './index.module.scss'
import EditCanvas from './components/EditCanvas'
import { useDispatch } from 'react-redux'
import { changeSelectedId } from '@/store/componentsReducer'
import LeftPanel from './components/LeftPanel'
import RightPanel from './components/RightPanel'
import EditHeader from './components/EditHeader'
import { useTitle } from 'ahooks'
import useGetPageInfo from '@/hooks/useGetPageInfo'

const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()

  function clearSelectedId() {
    dispatch(changeSelectedId(''))
  }

  const { title } = useGetPageInfo()
  useTitle(`问卷编辑 - ${title}`)

  return (
    <div className={styles.container}>
      {/* <div style={{ backgroundColor: 'white', height: '40px' }}>
        <EditHeader />
      </div> */}
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
