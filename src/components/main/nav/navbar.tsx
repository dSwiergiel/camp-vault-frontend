import { useState } from "react";
import { Link } from "react-router-dom";
import { Tent, Search, User, Menu, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      return newTheme;
    });
  };

  return (
    <nav className="border-b">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Tent className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">
                CampVault
              </span>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  to="/map"
                  className="text-sm font-medium hover:text-primary"
                >
                  Map
                </Link>
                <Link
                  to="/spots"
                  className="text-sm font-medium hover:text-primary"
                >
                  Spots
                </Link>
                <Link
                  to="/community"
                  className="text-sm font-medium hover:text-primary"
                >
                  Community
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Search spots..."
                className="w-64 pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:inline-flex"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button> */}
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
            <div className="flex md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="mr-2"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col space-y-4 mt-4">
                    <Link
                      to="/map"
                      className="text-sm font-medium hover:text-primary"
                    >
                      Map
                    </Link>
                    <Link
                      to="/spots"
                      className="text-sm font-medium hover:text-primary"
                    >
                      Spots
                    </Link>
                    <Link
                      to="/community"
                      className="text-sm font-medium hover:text-primary"
                    >
                      Community
                    </Link>
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <div className="md:hidden p-4 border-t">
          <Input
            type="search"
            placeholder="Search spots..."
            className="w-full"
          />
        </div>
      )}
    </nav>
  );
}
