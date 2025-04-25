import Header from "./layout/Header";
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Header />
      <main>
        <h1>
          <span>Wellcome!</span>
        </h1>
      </main>
    </ThemeProvider>
  );
}
