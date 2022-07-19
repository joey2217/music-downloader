import { useRecoilState } from 'recoil'
import { playListState } from './atom'
import type { Song } from '../types'
import getMusicApi from '../api/music'

export function usePlayList () {
  const [playList, setPlayList] = useRecoilState(playListState)
  const playIdList = playList.map(m => m.id)

  const addToPlayList = (songs:Song[]) => {
    const filteredData = songs.filter(s => !playIdList.includes(s.id))
    setPlayList(list => list.concat(filteredData))
  }
  
  return {
    addToPlayList,
  }
}

export async function addToPlayList2 (song:Song) {
  const [playList, setPlayList] = useRecoilState(playListState)
  const musicData = await getMusicApi().getMusic(song.id)
  if (musicData.length > 0) {
    setPlayList(list => list.concat({ ...song, url: musicData[0].url }))
  }
}
