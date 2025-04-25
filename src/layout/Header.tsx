import { NavLink } from "react-router";

export default function Header() {
  return (
    <header className="titleBarContainer border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="titleBar">
        <div className="container flex items-center h-9 gap-2 md:gap-4">
          <span>音乐下载</span>
          <NavLink to="/">home</NavLink>
          <div className="draggable flex-1 h-full"></div>
          {import.meta.env.DEV && <button onClick={window.mainAPI.toggleDevtools}>devtools</button>}
        </div>
      </div>
    </header>
  );
}
