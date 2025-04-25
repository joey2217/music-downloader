import appWindow from "@/lib/window";
import { Maximize, X, Minus } from "lucide-react";

export default function Control() {
  return (
    <div className="flex items-center">
      <div className="titlebar-button" id="titlebar-minimize" onClick={appWindow.minimize}>
        <Minus />
      </div>
      <div className="titlebar-button" id="titlebar-maximize" onClick={appWindow.toggleMaximize}>
        <Maximize />
      </div>
      <div className="titlebar-button" id="titlebar-close" onClick={appWindow.close}>
        <X />
      </div>
    </div>
  );
}
