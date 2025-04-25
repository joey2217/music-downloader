/// <reference types="vite/client" />

export interface IMainAPI {
  toggleDevtools: () => Promise<void>;
}
export type RemoveListener = () => void;
export interface IMainListener {}

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
