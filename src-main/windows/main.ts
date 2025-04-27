import { BrowserWindow, dialog, nativeTheme } from "electron/main";
import * as path from "node:path";
import { DARK_COLOR, DEV, ROOT } from "../constant";
import { checkForUpdates } from "../updater";

let win: BrowserWindow = null!;
let quit = false;

function create() {
  win = new BrowserWindow({
    width: 450,
    height: 800,
    show: false,
    titleBarStyle: "hidden",
    backgroundColor: nativeTheme.shouldUseDarkColors ? DARK_COLOR : "#fff",
    titleBarOverlay: {
      symbolColor: "#22c55e",
      height: 35,
      color: nativeTheme.shouldUseDarkColors ? DARK_COLOR : "#fff",
    },
    webPreferences: {
      devTools: DEV,
      preload: path.join(ROOT, "main.preload.cjs"),
      // webSecurity: import.meta.env.PROD,
    },
  });
  win.once("ready-to-show", () => {
    win.show();
    if (DEV) {
      win.webContents.openDevTools({ mode: "bottom" });
    }
    setImmediate(checkForUpdates);
  });

  win.on("close", (e) => {
    if (!quit) {
      e.preventDefault();
      dialog
        .showMessageBox({
          type: "question",
          buttons: ["是", "否"],
          title: "退出",
          message: "确定退出?",
        })
        .then((res) => {
          if (res.response === 0) {
            quit = true;
            win.close();
          }
        })
        .catch(() => {
          /** empty */
        });
    }
  });

  if (import.meta.env.DEV) {
    win.loadURL("http://localhost:5000");
  } else {
    win.loadFile(path.join(ROOT, "renderer/index.html"));
  }
}

function focus() {
  if (win) {
    if (win.isMinimized()) {
      win.restore();
    }
    win.show();
    win.focus();
  }
}

function send(channel: string, ...args: unknown[]) {
  win.webContents.send(channel, ...args);
}

function beforeQuit() {
  quit = true;
}

export const mainWindow = {
  create,
  focus,
  send,
  beforeQuit,
};

export default mainWindow;
