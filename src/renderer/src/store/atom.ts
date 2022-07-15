import { atom } from 'recoil'
import type { Song } from '../types'

export const playListState = atom<Song[]>({
  key: 'playListState',
  default: [],
})
