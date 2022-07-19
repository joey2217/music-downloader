import React, { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { Song } from '../../types'
import { playListState } from '../../store/atom'

const PlayList: React.FC = () => {
  const playList = useRecoilValue(playListState)
  const columns: ColumnsType<Song> = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'artist',
      dataIndex: 'artist',
      render: (text, { artist }, index) => <div className="truncate w-24" title={artist.map((a) => a.name).join()}>{artist.map((a) => a.name).join()}</div>,
    },
    {
      title: 'duration',
      dataIndex: 'duration',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, { artist }, index) => 'action',
    },
  ]
  return (
    <Table
      dataSource={playList}
      columns={columns}
      title={() => <div>title</div>}
      pagination={false}
      size="small"
      showHeader={false}
    />
  )
}

export default memo(PlayList)
