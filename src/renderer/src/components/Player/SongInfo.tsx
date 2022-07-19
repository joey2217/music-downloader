import React, { memo, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { playingState } from '../../store/atom'

const SongInfo: React.FC = () => {
  const playingSong = useRecoilValue(playingState)
  const audioRef = useRef<HTMLAudioElement>(null!)
  return (
    <div>
      {
        playingSong
          ? <div>{playingSong.name}
            {playingSong.url}</div>
          : <div>NoPlaying</div>
      }
      <audio ref={audioRef} />
    </div>
  )
}

export default memo(SongInfo)
