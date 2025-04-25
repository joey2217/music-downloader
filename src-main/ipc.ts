import { ipcMain } from "electron/main";
import { checkForUpdates } from "./updater";

export default function handleIPC() {
  ipcMain.handle("TOGGLE_DEVTOOLS", (event) => {
    event.sender.toggleDevTools();
  });

  ipcMain.handle("CHECK_FOR_UPDATE", (_e) => {
    return checkForUpdates()
  });
}
