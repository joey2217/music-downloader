import { session, app, Notification } from 'electron'
import * as os from 'os'
import * as path from 'path'
import { EVENTS } from './constants'
import { send as sendToMainWindow } from './windows/main'

let downloadDir = path.join(os.homedir(), 'Downloads')
let downloadFileName = ''

export function download (url:string, fileName:string) {
  downloadFileName = fileName
  session.defaultSession.downloadURL(url)
}

export function setSaveDir (setSaveDir:string) {
  downloadDir = setSaveDir
}

app.whenReady().then(() => {
  session.defaultSession.on('will-download', (event, item, webContents) => {
    if (downloadFileName) {
      const savePath = path.join(downloadDir, downloadFileName)
      item.setSavePath(savePath)
    }

    item.on('updated', (event, state) => {
      if (state === 'interrupted') {
        console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log(`Received bytes: ${item.getReceivedBytes()}, total: ${item.getTotalBytes()}`)
        }
      }
    })
    item.once('done', (event, state) => {
      if (state === 'completed') {
        console.log('Download successfully')
        // TODO 打包后通知 https://www.jianshu.com/p/b983d6c49f2f
        new Notification({
          title: '下载成功',
          body: `${downloadFileName}下载成功!`
        }).show()
        sendToMainWindow(EVENTS.DOWNLOAD_FINISH, `${downloadFileName}下载成功!`, 'success')
      } else {
        console.log(`Download failed: ${state}`)
        sendToMainWindow(EVENTS.DOWNLOAD_FINISH, `${downloadFileName}下载失败!`, 'failed')
      }
      downloadFileName = ''
    })
  })
})
