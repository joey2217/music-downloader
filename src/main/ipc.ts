import { ipcMain } from 'electron'
import { EVENTS } from './constants'
import { toggleDevTools as toggleMainWindowDevTools } from './windows/main'

export default function handleIPC () {
  ipcMain.handle(EVENTS.TOGGLE_MAIN_WINDOW_DEVTOOLS, toggleMainWindowDevTools)
}
