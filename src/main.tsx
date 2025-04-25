import { createRoot } from "react-dom/client";
import log from "electron-log/renderer";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!, {
  onCaughtError(error, errorInfo) {
    console.error("onCaughtError", { error, errorInfo });
    log.error("onCaughtError", { error, errorInfo });
  },
  onRecoverableError(error, errorInfo) {
    console.error("onRecoverableError", { error, errorInfo });
    log.error("onRecoverableError", { error, errorInfo });
  },
  onUncaughtError(error, errorInfo) {
    console.error("onUncaughtError", { error, errorInfo });
    log.error("onUncaughtError", { error, errorInfo });
  },
}).render(<App />);

log.info(`app@${window.env.version} started! ${JSON.stringify(window.env)}`);

window.onerror = (event, source, lineno, colno, error) => {
  console.error("Renderer Error:", { event, source, lineno, colno, error });
  // 发送错误信息到主进程
  log.error(error);
};

window.onunhandledrejection = (event) => {
  console.error("Renderer Unhandled Rejection:", event);
  // 发送错误信息到主进程
  log.error(event.reason);
};
