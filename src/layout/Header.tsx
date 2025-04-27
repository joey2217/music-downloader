import { Link, NavLink } from "react-router";
import logo from "@/assets/icon.png";

export default function Header() {
  return (
    <header className="titleBarContainer border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="titleBar">
        <div className="container flex items-center h-full gap-2 md:gap-4">
          <Link to="/">
            <img src={logo} className="h-8 w-8" alt="logo" />
          </Link>
          <NavLink className="nav-link" to="/">
            搜索
          </NavLink>
          <NavLink className="nav-link" to="/download">
            下载
          </NavLink>
          <NavLink className="nav-link" to="/setting">
            设置
          </NavLink>
          <div className="draggable flex-1 h-full"></div>
          {import.meta.env.DEV && <button onClick={window.mainAPI.toggleDevtools}>devtools</button>}
        </div>
      </div>
    </header>
  );
}
