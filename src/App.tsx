import "./App.css";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-4">
          <ThemeToggle />
          <Card className="rounded-3xl">
            <CardContent>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
              <h1>Hello World</h1>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
