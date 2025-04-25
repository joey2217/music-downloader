import { autoUpdater } from "electron-updater";
import log from "electron-log/main";
import { dialog } from "electron";

autoUpdater.autoDownload = false;
autoUpdater.logger = log;

autoUpdater.on("error", (error) => {
  dialog.showErrorBox("更新出错了", error == null ? "unknown" : (error.stack || error).toString());
});

autoUpdater.on("update-available", (info) => {
  dialog
    .showMessageBox({
      type: "info",
      title: `检测到新版本 ${info.version}`,
      message: `更新时间: ${info.releaseDate}`,
      detail: `更新内容:\n${info.releaseNotes}`,
      buttons: ["立刻更新", "稍后更新"],
      cancelId: 1,
    })
    .then((res) => {
      if (res.response === 0) {
        autoUpdater.downloadUpdate();
      }
    });
});

autoUpdater.on("update-not-available", () => {
  dialog.showMessageBox({
    type: "info",
    title: "暂无更新",
    message: "当前版本已经是最新版本",
  });
});

autoUpdater.on("update-downloaded", (info) => {
  dialog
    .showMessageBox({
      type: "info",
      title: `${info.version} 更新下载完成`,
      message: `更新时间: ${info.releaseDate}`,
      detail: `更新内容:\n${info.releaseNotes}`,
      buttons: ["立刻重启更新", "下次启动更新"],
      cancelId: 1,
    })
    .then((res) => {
      if (res.response === 0) {
        setImmediate(() => autoUpdater.quitAndInstall(true, true));
      } else {
        autoUpdater.autoInstallOnAppQuit = true;
      }
    });
});

export function checkForUpdates() {
  return autoUpdater.checkForUpdates();
}

