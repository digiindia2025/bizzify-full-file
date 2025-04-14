import React from "react";
import { Sidebar } from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AdminLayoutProps = {
  children: React.ReactNode;
  title: string;
  onSearch?: (value: string) => void; // added support for search callback
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  onSearch,
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleViewSite = () => {
    window.location.href = "https://classified.dextrous.co.in/";
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value); // call search callback if provided
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>

            <div className="flex items-center space-x-4">
              {/* Search - hidden on small screens */}
              <div className="relative w-48 sm:w-64">
                <Input
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 pr-4 py-2 border rounded-md"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Large screen: show full buttons */}
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600"
                  onClick={handleViewSite}
                >
                  <LogOut className="h-4 w-4" />
                  <span>View Site</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log Out</span>
                </Button>
              </div>

              {/* Small screen: icon with dropdown */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleViewSite}>
                      <LogOut className="h-4 w-4 mr-2" />
                      View Site
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Log Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">{children}</main>

        <footer className="bg-white border-t py-3 px-4 text-center text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <span> Biziffy All copyright (C) 2025 Reserved</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
