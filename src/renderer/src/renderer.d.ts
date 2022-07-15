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
}
declare global {
  interface Window {
    myAPI: ImyAPI;
    versions: IVersions;
    electronAPI: ElectronAPI;
  }
}
