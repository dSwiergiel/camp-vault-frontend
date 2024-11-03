import { Link } from "react-router-dom";
import { Tent, Menu, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/main/nav/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="border-b border-input bg-card">
      <div className="container mx-auto px-4">
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
          <div className="flex items-center ">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex ml-2"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
            <div className="flex md:hidden">
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
    </nav>
  );
}
