import { contextBridge, ipcRenderer } from "electron/renderer";
import { version } from "../../package.json";

/**
 * Sandboxed preload scripts can't use ESM imports
 * https://www.electronjs.org/zh/docs/latest/tutorial/esm#preload-%E8%84%9A%E6%9C%AC
 */
// renderer -> main
contextBridge.exposeInMainWorld("mainAPI", {
  toggleDevtools: () => ipcRenderer.invoke("TOGGLE_DEVTOOLS"),
});

// function addListener(channel: string, callback: (...args: unknown[]) => void) {
//   const listener = (_event: Electron.IpcRendererEvent, ...args: unknown[]) =>
//     callback(...args)
//   ipcRenderer.on(channel, listener)
//   return () => ipcRenderer.off(channel, listener)
// }

// main -> renderer
contextBridge.exposeInMainWorld("mainListener", {});

contextBridge.exposeInMainWorld("env", {
  node: process.versions.node,
  chrome: process.versions.chrome,
  electron: process.versions.electron,
  version,
  platform: process.platform,
  dev: import.meta.env.DEV || process.argv.includes("--dev"),
});
