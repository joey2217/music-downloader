import { NavLink } from "react-router";
import Control from "./Control";

export default function Header({}: {}) {
  return (
    <header className="select-none sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center h-9 gap-2 md:gap-4">
        <NavLink to="/" className="flex items-center gap-2">
          home
        </NavLink>
        <div data-tauri-drag-region className="flex-1 h-full">
        </div>
        <Control />
      </div>
    </header>
  );
}
