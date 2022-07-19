import React, { memo, useCallback, useEffect, useState } from 'react'
import { Input, Segmented, Skeleton, Table } from 'antd'
import getMusicApi from '../../api/music'
import type { Song, Page } from '../../types'
import type { ColumnsType } from 'antd/lib/table'
import {
  CloudDownloadOutlined,
  PlayCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import { usePlayList } from '../../store/hooks'
import { download } from '../../utils'

const { Search } = Input

const options = [
  {
    label: '网易云音乐',
    value: 'netcaseCloud',
  },
]

const SearchPage: React.FC = () => {
  const { addToPlayList } = usePlayList()
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState<Song[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState<Page>({ page: 1, size: 10 })
  const onSearch = (value: string) => {
    setKeyword(value)
  }

  const [type, setType] = useState(options[0].value)

  const onPageChange = (page: number, pageSize: number) => {
    setPage({ page, size: pageSize })
  }

  useEffect(() => {
    if (keyword) {
      setLoading(true)
      getMusicApi()
        .search(keyword, page)
        .then((data) => {
          setList(data.list)
          setTotal(data.total)
        }).finally(() => {
          setLoading(false)
        })
    }
  }, [page, keyword])

  const columns: ColumnsType<Song> = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Album',
      dataIndex: 'Album',
      render: (text, { album }, index) => album.name,
    },
    {
      title: 'artist',
      dataIndex: 'artist',
      render: (text, { artist }, index) => <div className="truncate w-52" title={artist.map((a) => a.name).join()}>{artist.map((a) => a.name).join()}</div>,
      width: 208,
    },
    {
      title: 'duration',
      dataIndex: 'duration',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record, index) => (
        <div className="flex items-center justify-between w-14">
          <PlayCircleOutlined />
          <PlusCircleOutlined title="添加到正在播放" onClick={() => addToPlayList([record])} />
          <CloudDownloadOutlined title="下载" onClick={() => download(record)}/>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Search
        defaultValue=""
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
      />
      <div>
        <Segmented
          block
          value={type}
          options={options}
          onChange={(val) => setType(val as string)}
        />
      </div>
      <div style={{
        height: 'calc(100vh - 191px)',
        overflow: 'auto',
      }}>
        {
          loading
            ? <Skeleton active />
            : <Table
              dataSource={list}
              columns={columns}
              rowKey = "id"
              pagination={{
                position: ['bottomCenter'],
                total,
                onChange: onPageChange,
                showSizeChanger: false,
              }}
            />
        }

      </div>
    </div>
  )
}

export default memo(SearchPage)
