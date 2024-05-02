import React, { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { LIST_PAGE_SIZE, LIST_PAGE_PARAM_KEY, LIST_PAGESIZE_PARAM_KEY } from '@/constant'

type PropType = {
  total: number
}

const ListPage: FC<PropType> = (props: PropType) => {
  const { total } = props
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE)

  // 从url 参数中找到page pageSize,并且同步到 Pagination 组件中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize = parseInt(searchParams.get(LIST_PAGESIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [])

  // 当page pageSize改变时，跳转页面（改变url参数）
  const nav = useNavigate()
  const { pathname } = useLocation()
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrent(page)
    setPageSize(pageSize)
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGESIZE_PARAM_KEY, pageSize.toString())
    nav({
      pathname,
      search: searchParams.toString(),
    })
  }
  return (
    <Pagination pageSize={pageSize} current={current} onChange={handlePageChange} total={total} />
  )
}

export default ListPage
