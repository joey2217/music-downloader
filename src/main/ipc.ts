import { ipcMain } from 'electron'
import { EVENTS } from './constants'
import { download, setSaveDir } from './session'
import { toggleDevTools as toggleMainWindowDevTools } from './windows/main'

export default function handleIPC () {
  // devtools
  ipcMain.handle(EVENTS.TOGGLE_MAIN_WINDOW_DEVTOOLS, toggleMainWindowDevTools)
  // 下载
  ipcMain.handle(EVENTS.DOWNLOAD_FILE, (e, url:string, fileName:string) => {
    download(url, fileName)
  })
  // 下载路径
  ipcMain.handle(EVENTS.SET_SAVE_DIR, (e, saveDir:string) => {
    setSaveDir(saveDir)
  })
}
