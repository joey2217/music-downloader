import type { Song } from '../types'
import getMusicApi from '../api/music'

export function dtConverter (dt:number) {
  const seconds = dt / 1000
  const min = Math.floor(seconds / 60).toString().padStart(2, '0')
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${min} : ${sec}`
}

export async function download (song:Song) {
  const musicData = await getMusicApi().getMusic(song.id)
  if (musicData.length > 0) {
    const [data] = musicData
    const fileName = `${song.artist.map(a => a.name).join()}-${song.name}.${data.type}`
    console.log(`DOWNLOAD url:${data.url}   fileName:${fileName}`)
    window.electronAPI.download(data.url, fileName)
  }
}
