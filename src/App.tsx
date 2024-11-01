import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/main/nav/navbar";
import { BrowserRouter } from "react-router-dom";
import CampsiteExplorer from "./components/main/campsite-explorer/campsite-explorer";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Navbar></Navbar>
        <CampsiteExplorer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
