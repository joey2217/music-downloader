import React, { memo } from 'react'
import type {Song} from '../../types'

interface Props{
  songs:Song[]
}

const SongList: React.FC<Props> = ({songs}) => {
  return (
    <>SongList</>
  )
}

export default memo(SongList)
