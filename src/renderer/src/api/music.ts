import * as neteaseCloud from './neteaseCloud'

export type MusicType = 'neteaseCloud'

export default function getMusicApi (type:MusicType = 'neteaseCloud') {
  switch (type) {
  default:
    return neteaseCloud
  }
}
