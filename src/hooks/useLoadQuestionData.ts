import { useParams } from 'react-router-dom'
import { getQuestionService } from '../services/question'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '@/store/componentsReducer/index'

function useLoadQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()

  // ajax加载
  const { data, loading, error, run } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionService(id)
      return data
    },
    { manual: true },
  )

  //根据获取的 data 设置 redux store
  useEffect(() => {
    if (!data) return
    const { title = '', componentList = [] } = data

    // 把 componentList 存储到Redux store 中
    dispatch(resetComponents({ componentList }))
  }, [data])

  // 判断id变化 执行ajax 加载问卷数据
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}

export default useLoadQuestionData
