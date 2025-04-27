import { Outlet } from "react-router";
import Header from "./Header";
import { useUpdateDownloadStatus } from "@/store/download";

export default function Layout() {
  useUpdateDownloadStatus();
  return (
    <div>
      <Header />
      <div id="main" className="scrollbar">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
