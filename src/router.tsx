import { createHashRouter } from "react-router";
import Layout from "./layout";
import Home, { homeLoader } from "./pages/home";

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        loader: homeLoader,
        element: <Home />,
      },
    ],
  },
]);

export default router;
