import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
  isA: true,
})

contextBridge.exposeInMainWorld('versions', {
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  node: process.versions.node,
})
