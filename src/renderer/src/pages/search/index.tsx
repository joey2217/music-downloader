import React, { memo, useEffect, useState } from 'react'
import { Input, Segmented, Table } from 'antd'
import getMusicApi from '../../api/music'
import type { Song } from '../../types'
import type { ColumnsType } from 'antd/lib/table'
const { Search } = Input

const options = [
  {
    label: '网易云音乐',
    value: 'netcaseCloud'
  }
]

const columns:ColumnsType<Song> = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: 'Album',
    dataIndex: 'album.name',
    render: (text, record, index) => record.album.name
  },
  {
    title: 'artist',
    dataIndex: 'artist',
    render: (text, record, index) => record.artist.map(a => a.name).join()
  },
]

const SearchPage: React.FC = () => {
  const [keyword, setKeyword] = useState('')
  const [list, setList] = useState<Song[]>([])
  const onSearch = (value: string) => console.log(value)
  const [type, setType] = useState(options[0].value)

  useEffect(() => {
    getMusicApi().search('海阔天空').then(data => {
      setList(data)
    })
  }, [])
  return (
    <div>
      <Search defaultValue='' placeholder="input search text" onSearch={onSearch} enterButton />
      <div>
        <Segmented
          block
          value={type}
          options={options}
          onChange={(val) => setType(val as string)}
        />
      </div>
      <Table dataSource={list} columns={columns} />
    </div>
  )
}

export default memo(SearchPage)
