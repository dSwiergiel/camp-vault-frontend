import "./App.css";
import { ThemeProvider } from "./context/ThemeContext/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import CampsiteExplorer from "@/components/main/campsite-explorer/CampsiteExplorer";
import { CampsiteProvider } from "./context/CampsiteContext/CampsiteContext";
import Navbar from "./components/main/nav/Navbar";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Navbar />
        <CampsiteProvider>
          <CampsiteExplorer />
        </CampsiteProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
