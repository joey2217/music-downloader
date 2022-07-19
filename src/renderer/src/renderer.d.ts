/* eslint-disable no-unused-vars */
export interface ImyAPI {
  desktop: boolean;
}

export interface IVersions {
  chrome: string;
  node: string;
  electron: string;
  v8: string;
}

export interface ElectronAPI {
  toggleMainWindowDevtools: () => Promise<void>;
  download: (url: string, fileName:string) => Promise<void>;
  setSaveDir: (saveDir:string) => Promise<void>;
  onDownloadFinish:(callback:(e: any, message:string, type:'success'|'failed')=>void)=>void
}
declare global {
  interface Window {
    myAPI: ImyAPI;
    versions: IVersions;
    electronAPI: ElectronAPI;
  }
}
