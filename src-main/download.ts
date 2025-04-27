import { app, session } from "electron";
import log from "electron-log/main";
import * as path from "node:path";
import type { DownloadInfo } from "./types";
import { mainWindow } from "./windows/main";
import { Promise as NodeID3Promise } from "node-id3";

let downloadFile: DownloadInfo;
const downloadFiles: DownloadInfo[] = [];

export function download(...items: DownloadInfo[]) {
  if (items.length > 0) {
    const downloadFileIds = downloadFiles.map((f) => f.id);
    const downloadItems = items.filter((f) => !downloadFileIds.includes(f.id));
    downloadFiles.push(...downloadItems);
    if (downloadFile == null && downloadItems.length > 0) {
      downloadFile = downloadFiles.shift()!;
      if (downloadFile) {
        session.defaultSession.downloadURL(downloadFile.url);
      }
    }
  }
}

function sendDownloadStatus(info: Partial<DownloadInfo>) {
  mainWindow.send("UPDATE_DOWNLOAD", {
    ...downloadFile,
    ...info,
  });
}

// https://www.electronjs.org/zh/docs/latest/api/download-item
app.whenReady().then(() => {
  session.defaultSession.on("will-download", (_event, item) => {
    downloadFile.downloadPath = path.normalize(downloadFile.downloadPath);
    item.setSavePath(downloadFile.downloadPath);
    sendDownloadStatus({
      status: "downloading",
    });

    // item.on("updated", (_event, state) => {
    //   if (state === "interrupted") {
    //     log.info("Download is interrupted but can be resumed");
    //   } else if (state === "progressing") {
    //     if (item.isPaused()) {
    //       log.info("Download is paused");
    //     } else {
    //       log.info(`getPercentComplete: ${item.getPercentComplete()}`);
    //     }
    //   }
    // });

    item.once("done", (_event, state) => {
      if (state === "completed") {
        log.info("Download successfully", downloadFile.downloadPath);
        onCompleted(true);
      } else {
        log.info(`Download failed: ${state}`);
        onCompleted(false);
      }
    });
  });
});

function fetchCoverBuffer(imgUrl: string): Promise<ArrayBuffer | undefined> {
  let url = "";
  if (imgUrl.startsWith("//")) {
    url = "https:" + imgUrl;
  } else {
    url = imgUrl;
  }
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .catch((error) => {
      log.error("fetchCoverBuffer error", error, imgUrl);
      return undefined;
    });
}

function onCompleted(success: boolean) {
  if (downloadFile) {
    sendDownloadStatus({
      status: success ? "completed" : "failed",
    });
    if (success) {
      fetchCoverBuffer(downloadFile.cover).then((buffer) => {
        NodeID3Promise.write(
          {
            title: downloadFile.title,
            artist: downloadFile.artist,
            album: downloadFile.album,
            image: buffer
              ? {
                  mime: downloadFile.cover.endsWith(".webp") ? "image/webp" : "image/jpeg",
                  type: {
                    id: 3,
                    name: "front cover",
                  },
                  description: "cover",
                  imageBuffer: Buffer.from(buffer),
                }
              : undefined,
          },
          downloadFile.downloadPath
        )
          .then((bool) => {
            log.info("歌曲标签写入成功", bool);
          })
          .catch((error) => {
            log.info("歌曲标签写入失败", error);
          })
          .finally(() => {
            if (downloadFiles.length > 0) {
              downloadFile = downloadFiles.shift()!;
              if (downloadFile) {
                session.defaultSession.downloadURL(downloadFile.url);
              }
            } else {
              // @ts-expect-error  2322
              downloadFile = undefined;
            }
          });
      });
    }
  }
}
