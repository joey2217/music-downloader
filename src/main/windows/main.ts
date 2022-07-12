import { BrowserWindow } from 'electron'
import * as path from 'path'
import { IS_DEV } from '../constants'

let win: BrowserWindow

export function create () {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.on('ready-to-show', () => {
    win.show()
  })
  if (IS_DEV) {
    win.loadURL('http://localhost:3000')
  } else {
    win.loadFile(path.join(__dirname, '/renderer/index.html'))
  }
}

export function focus () {
  if (win.isMinimized()) win.restore()
  win.focus()
}

export function send (channel: string, ...args: any[]) {
  win.webContents.send(channel, ...args)
}
