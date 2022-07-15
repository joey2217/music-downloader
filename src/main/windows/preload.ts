import { contextBridge, ipcRenderer } from 'electron'
import { EVENTS } from '../constants'

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
})
