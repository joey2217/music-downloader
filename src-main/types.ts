export type DownloadStatus = 'init' | 'downloading' | 'completed' | 'failed'

export interface DownloadInfo {
  fileName: string
  downloadPath: string
  id: string
  url: string
  title: string
  artist: string
  album: string
  cover: string
  status: DownloadStatus
}

