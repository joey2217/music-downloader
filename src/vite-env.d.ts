/// <reference types="vite/client" />

export type DownloadStatus = "init" | "downloading" | "completed" | "failed";

export interface DownloadInfo {
  fileName: string;
  downloadPath: string;
  id: string;
  url: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  status: DownloadStatus;
}

type PathName =
  | "home"
  | "appData"
  | "userData"
  | "sessionData"
  | "temp"
  | "exe"
  | "module"
  | "desktop"
  | "documents"
  | "downloads"
  | "music"
  | "pictures"
  | "videos"
  | "recent"
  | "logs"
  | "crashDumps";

export interface IMainAPI {
  toggleDevtools: () => Promise<void>;
  setTheme: (theme: "system" | "light" | "dark") => Promise<void>;
  download: (...items: DownloadInfo[]) => Promise<void>;
  openPath: (fullPath: string) => Promise<string>;
  getPath: (name: PathName) => Promise<string>;
  selectDirectory: (config?: Pick<Electron.OpenDialogOptions, "title">) => Promise<string>;
  showItemInFolder: (fullPath: string) => Promise<void>;
}
export type RemoveListener = () => void;
export interface IMainListener {
  onUpdateDownload: (callback: (info: DownloadInfo) => void) => RemoveListener;
}

export interface Versions {
  node: string;
  chrome: string;
  electron: string;
  version: string;
  dev: boolean;
  platform: "aix" | "darwin" | "freebsd" | "linux" | "openbsd" | "sunos" | "win32";
}

export declare global {
  interface Window {
    mainAPI: IMainAPI;
    mainListener: IMainListener;
    env: Versions;
  }
}
