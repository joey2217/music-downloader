import { atom } from 'recoil'
import type { PlayingSong, Song } from '../types'

export const playListState = atom<Song[]>({
  key: 'playListState',
  default: [],
})

export const playingState = atom<PlayingSong|null>({
  key: 'playingState',
  default: null,
})
