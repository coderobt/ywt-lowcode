import React, { FC, useEffect, useState, useRef } from 'react'
import QuestionCard from '../../components/QuestionCard'
import styles from './common.module.scss'
import { useTitle, useDebounceFn, useRequest } from 'ahooks'
import { Typography, Spin, Empty } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { getQuestionListService } from '@/services/question'
import ListSearch from '@/components/ListSearch'
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from '@/constant'

const { Title } = Typography

const List: FC = () => {
  useTitle('小雅问卷-我的问卷')

  const [started, setStarted] = useState(false) //是否已经开始加载(防抖,有延迟时间)
  const [total, setTotal] = useState(0) //List内部的数据 不在url参数中体现
  const [page, setPage] = useState(1)
  const [list, setList] = useState([]) //全部的列表数据 上滑 累计
  const haveMoreData = total > list.length //有没有更多未加载数据

  const [searchParams] = useSearchParams() //获取keyword
  const containerRef = useRef<HTMLDivElement>(null)
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''

  // keyword变化时，重置数据
  useEffect(() => {
    setStarted(false)
    setPage(1)
    setList([])
    setTotal(0)
  }, [keyword])

  //真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      })
      return data
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result
        setList(list.concat(l))
        setTotal(total)
        setPage(page + 1)
      },
    },
  )

  //尝试去触发加载-防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current
      if (elem === null) return
      const domReact = elem.getBoundingClientRect()
      if (domReact === null) return
      const { bottom } = domReact
      if (bottom <= document.body.clientHeight) {
        load() //真正加载数据
        setStarted(true)
      }
    },
    {
      wait: 1000,
    },
  )
  //1.当页面加载或者 keyword变化时触发
  useEffect(() => {
    tryLoadMore()
  }, [searchParams])
  //2.当页面滚动时，要尝试触发加载
  useEffect(() => {
    if (haveMoreData) {
      //自己绑定的dom事件在effect结束时一定要解绑
      window.addEventListener('scroll', tryLoadMore) //防抖
    }
    return () => {
      window.removeEventListener('scroll', tryLoadMore) //解绑事件，重要，否则会造成内存泄漏
    }
  }, [searchParams, haveMoreData])

  const LoadMoreContentElem = () => {
    if (!started || loading) return <Spin />
    if (total === 0) return <Empty description="暂无数据" />
    if (!haveMoreData) return <span>没有更多了...</span>
    return <span>开始加载下一页</span>
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q
            return <QuestionCard key={_id} {...q} />
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{LoadMoreContentElem()}</div>
      </div>
    </>
  )
}

export default List
