import type { DownloadInfo } from "@/vite-env";
import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

interface DownloadState {
  items: DownloadInfo[];
  download: (...items: DownloadInfo[]) => Promise<void>;
  update: (info: DownloadInfo) => void;
}

export const useDownloadStore = create<DownloadState>()(
  persist(
    (set) => ({
      items: [],
      download: (...downloadItems: DownloadInfo[]) =>
        window.mainAPI.download(...downloadItems).then(() => {
          set((s) => ({
            items: [
              ...downloadItems,
              ...s.items.filter((item) => !downloadItems.find((downloadItem) => downloadItem.id === item.id)),
            ],
          }));
        }),
      update: (info: DownloadInfo) =>
        set((s) => ({
          items: s.items.map((item) => (item.id === info.id ? { ...item, ...info } : item)),
        })),
    }),
    {
      name: "download_list",
    }
  )
);

export function useUpdateDownloadStatus() {
  const update = useDownloadStore((s) => s.update);
  useEffect(() => {
    return window.mainListener.onUpdateDownload((info) => {
      update(info);
      if (info.status === "completed") {
        toast.success(`${info.title}下载完成`);
      }
    });
  }, [update]);
}
