import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRendererEvent } from 'electron'
import { EVENTS } from '../constants'
/**
 * @link https://www.electronjs.org/zh/docs/latest/tutorial/sandbox#preload-%E8%84%9A%E6%9C%AC
 */
contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
})

contextBridge.exposeInMainWorld('versions', {
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  node: process.versions.node,
})

contextBridge.exposeInMainWorld('electronAPI', {
  toggleMainWindowDevtools: () => ipcRenderer.invoke(EVENTS.TOGGLE_MAIN_WINDOW_DEVTOOLS),
  download: (url:string, fileName:string) => ipcRenderer.invoke(EVENTS.DOWNLOAD_FILE, url, fileName),
  setSaveDir: (saveDir:string) => ipcRenderer.invoke(EVENTS.SET_SAVE_DIR, saveDir),
  onDownloadFinish: (callback:(e: IpcRendererEvent, message:string, type:'success'|'failed')=>void) => ipcRenderer.on(EVENTS.DOWNLOAD_FINISH, callback)
})
