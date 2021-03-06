import { app, Menu } from 'electron'
import {
  create as createMainWindow,
  focus as focusMainWindow,
} from './windows/main'
import { loadDevTools } from './dev'
import { IS_DEV } from './constants'
import handleIPC from './ipc'

const gotTheLock = app.requestSingleInstanceLock()

Menu.setApplicationMenu(null)
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到Window这个窗口
    focusMainWindow()
  })
  app.whenReady().then(() => {
    createMainWindow()
    handleIPC()
    if (IS_DEV) {
      loadDevTools()
    }
  })
}
