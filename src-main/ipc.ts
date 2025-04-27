import { app, dialog, ipcMain, nativeTheme } from "electron/main";
import type { DownloadInfo } from "./types";
import { download } from "./download";
import { shell } from "electron/common";
import path from "node:path";

app.whenReady().then(() => {
  ipcMain.handle("TOGGLE_DEVTOOLS", (event) => {
    event.sender.toggleDevTools();
  });

  ipcMain.handle("SET_THEME", (_event, theme: "system" | "light" | "dark") => {
    nativeTheme.themeSource = theme;
  });

  ipcMain.handle("DOWNLOAD_MUSIC", (_e, ...items: DownloadInfo[]) => {
    download(...items);
  });

  ipcMain.handle("OPEN_PATH", (_event, fullPath: string) => {
    return shell.openPath(path.normalize(fullPath));
  });

  ipcMain.handle("GET_PATH", (_event, name) => {
    return app.getPath(name);
  });

  ipcMain.handle("SELECT_DIRECTORY", (_event, config?: Pick<Electron.OpenDialogOptions, "title">) => {
    return dialog
      .showOpenDialog({
        ...config,
        properties: ["openDirectory"],
      })
      .then(({ canceled, filePaths }) => {
        if (canceled) {
          throw new Error("cancel");
        }
        if (filePaths.length === 0) {
          throw new Error("select nothing");
        }
        return filePaths[0];
      });
  });
});
