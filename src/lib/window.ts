import { Window } from "@tauri-apps/api/window";

const _appWindow = new Window("main");

function minimize() {
    return _appWindow.minimize();
}

function toggleMaximize() {
    return _appWindow.toggleMaximize();
}

function close() {
    return _appWindow.close();
}

export const appWindow = {
    minimize,
    toggleMaximize,
    close
}

export default appWindow