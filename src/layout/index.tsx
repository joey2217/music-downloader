import { Outlet } from "react-router";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <Header />
      <div id="main">
        <Outlet />
      </div>
    </div>
  );
}
