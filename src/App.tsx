import { RouterProvider } from "react-router";
import { ThemeProvider } from "@/components/theme-provider";
import router from "./router";
import { Toaster } from "@/components/ui/sonner"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
