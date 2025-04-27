import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Br, setConfig, Source } from "../lib/api";

interface SettingState {
  downloadDir: string;
  br: Br;
  source: Source;
  setSource: (source: Source) => void;
  setBr: (br: Br) => void;
  setDownloadDir: (dir: string) => void;
}

export const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      downloadDir: "",
      br: Br.High,
      source: "kuwo",
      setSource: (source) => set(() => ({ source })),
      setBr: (br) => set(() => ({ br })),
      setDownloadDir: (dir) => set(() => ({ downloadDir: dir })),
    }),
    {
      name: "settings",
    }
  )
);

useSettingStore.subscribe((state) => {
  setConfig(state);
});

function init() {
  const { downloadDir, setDownloadDir } = useSettingStore.getState();
  if (downloadDir === "") {
    window.mainAPI.getPath("music").then(setDownloadDir);
  }
}

init();
