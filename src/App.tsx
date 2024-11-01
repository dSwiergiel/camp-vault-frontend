import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./components/main/nav/navbar";
import { BrowserRouter } from "react-router-dom";
import CampsiteExplorer from "./components/main/campsite-explorer/campsite-explorer";
import { CampsiteProvider } from "./context/CampsiteContext";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Navbar></Navbar>
        <CampsiteProvider>
          <CampsiteExplorer />
        </CampsiteProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
