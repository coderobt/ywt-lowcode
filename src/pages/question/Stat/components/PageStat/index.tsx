import React, { FC, useState } from 'react'
import { getQuestionStatListService } from '@/services/stat'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'
import { Typography, Spin, Table, Pagination } from 'antd'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { STAT_PAGE_SIZE } from '@/constant'

const { Title } = Typography

type PropsType = {
  selectedComponentId: string
  setSelectedComponentId: (id: string) => void
  setSelectedComponentType: (type: string) => void
}

const PageStat: FC<PropsType> = (props: PropsType) => {
  const { selectedComponentId, setSelectedComponentId, setSelectedComponentType } = props
  const { id = '' } = useParams()
  const [total, setTotal] = useState(0)
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(STAT_PAGE_SIZE)

  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListService(id, { page, pageSize })
      return res
    },
    {
      refreshDeps: [id, page, pageSize], //依赖
      onSuccess: res => {
        const { total, list = [] } = res
        setList(list)
        setTotal(total)
      },
    },
  )

  const { componentList } = useGetComponentInfo()
  const columns = componentList.map(c => {
    const { fe_id, title, props = {}, type } = c

    const colTitle = props!.title || title
    return {
      // title: colTitle,
      title: (
        <div
          onClick={() => {
            setSelectedComponentId(fe_id)
            setSelectedComponentType(type)
          }}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ color: fe_id === selectedComponentId ? '#1890ff' : 'inherit' }}>
            {colTitle}
          </span>
        </div>
      ),
      dataIndex: fe_id,
    }
  })

  const dataSource = list.map((c: any) => ({ ...c, key: c._id }))
  const TableElem = (
    <>
      <Table pagination={false} columns={columns} dataSource={dataSource}></Table>
      <div style={{ textAlign: 'center', marginTop: '18px' }}>
        <Pagination
          onShowSizeChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
          }}
          onChange={page => setPage(page)}
          total={total}
          pageSize={pageSize}
          current={page}
        ></Pagination>
      </div>
    </>
  )

  return (
    <div>
      <Title level={3}>答卷数量：{!loading && total}</Title>
      {loading && (
        <div style={{ textAlign: 'center' }}>
          <Spin />
        </div>
      )}
      {TableElem}
    </div>
  )
}

export default PageStat
