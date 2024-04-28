import React, { FC, useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Input } from 'antd'
import { LIST_SEARCH_PARAM_KEY } from '@/constant'

const { Search } = Input

const ListSearch: FC = () => {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  //获取url参数，并设置到 input value中
  const [searchParams] = useSearchParams()
  useEffect(() => {
    setValue(searchParams.get(LIST_SEARCH_PARAM_KEY) || '')
  }, [searchParams])
  const handleSearch = (value: string) => {
    //跳转页面,添加url参数
    nav({
      pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <Search
      size="large"
      allowClear
      value={value}
      placeholder="输入关键字"
      onSearch={handleSearch}
      style={{ width: '260px' }}
      onChange={handleChange}
    />
  )
}

export default ListSearch
