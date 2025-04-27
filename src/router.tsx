import { createHashRouter } from "react-router";
import Layout from "./layout";
import Home, { homeLoader }  from "./pages/home";
import Download from "./pages/download";
import Setting from "./pages/setting";

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        loader: homeLoader,
        element: <Home />,
      },
      {
        path: "/download",
        element: <Download />,
      },
      {
        path: "/setting",
        element: <Setting />,
      },
    ],
  },
]);

export default router;
