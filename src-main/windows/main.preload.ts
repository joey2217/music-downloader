import { contextBridge, ipcRenderer } from "electron/renderer";
import { version } from "../../package.json";
import type { DownloadInfo } from "../types";

/**
 * Sandboxed preload scripts can't use ESM imports
 * https://www.electronjs.org/zh/docs/latest/tutorial/esm#preload-%E8%84%9A%E6%9C%AC
 */
// renderer -> main
contextBridge.exposeInMainWorld("mainAPI", {
  toggleDevtools: () => ipcRenderer.invoke("TOGGLE_DEVTOOLS"),
  setTheme: (theme: "system" | "light" | "dark") => ipcRenderer.invoke("SET_THEME", theme),
  download: (...items: DownloadInfo[]) => ipcRenderer.invoke("DOWNLOAD_MUSIC", ...items),
  openPath: (fullPath: string) => ipcRenderer.invoke("OPEN_PATH", fullPath),
  getPath: (name: string) => ipcRenderer.invoke("GET_PATH", name),
  showItemInFolder: (fullPath: string) => ipcRenderer.invoke("SHOW_ITEM_IN_FOLDER", fullPath),
  selectDirectory: (config?: Pick<Electron.OpenDialogOptions, "title">) =>
    ipcRenderer.invoke("SELECT_DIRECTORY", config),
});

function addListener(channel: string, callback: (...args: any[]) => void) {
  const listener = (_event: Electron.IpcRendererEvent, ...args: any[]) => callback(...args);
  ipcRenderer.on(channel, listener);
  return () => ipcRenderer.off(channel, listener);
}

// main -> renderer
contextBridge.exposeInMainWorld("mainListener", {
  onUpdateDownload: (callback: (info: DownloadInfo) => void) => addListener("UPDATE_DOWNLOAD", callback),
});

contextBridge.exposeInMainWorld("env", {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
  dev: import.meta.env.DEV || process.argv.includes("--dev"),
});
