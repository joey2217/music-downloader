import { Menu, dialog } from "electron/main";
import { APP_NAME } from "./constant";
import { version } from "../package.json";

function about() {
  dialog.showMessageBox({
    // icon: icon,
    type: "info",
    title: "关于" + APP_NAME,
    message: `${APP_NAME}\nv${version}\nnode: ${process.versions.node}\nchrome: ${process.versions.chrome}\nelectron: ${process.versions.electron}\nplatform: ${process.platform}\nv8: ${process.versions.v8}\n`,
  });
}

if (process.platform === "darwin") {
  const menu = Menu.buildFromTemplate([
    {
      label: APP_NAME,
      submenu: [
        { label: "关于" + APP_NAME, click: about },
        { type: "separator" },
        { role: "services", label: "服务" },
        { type: "separator" },
        { role: "hide", label: "隐藏" },
        { role: "hideOthers", label: "隐藏其他" },
        { role: "unhide", label: "全部显示" },
        { type: "separator" },
        { label: "退出 " + APP_NAME, role: "quit" },
      ],
    },
    {
      label: "查看",
      submenu: [
        { role: "reload", label: "刷新" },
        { role: "forceReload", label: "强制刷新" },
        { role: "toggleDevTools", label: "切换开发者工具" },
        { type: "separator" },
        { role: "resetZoom", label: "重置缩放" },
        { role: "zoomIn", label: "缩小" },
        { role: "zoomOut", label: "放大" },
        { type: "separator" },
        { role: "togglefullscreen", label: "切换全屏" },
      ],
    },
    {
      label: "窗口",
      submenu: [
        { role: "minimize", label: "最小化" },
        { role: "zoom", label: "缩放" },
        { type: "separator" },
        { role: "front", label: "置顶" },
        { role: "togglefullscreen", label: "切换全屏" },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
} else {
  Menu.setApplicationMenu(null);
}
