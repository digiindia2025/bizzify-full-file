import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  MessageSquare,
  PanelLeft,
  Link as LinkIcon,
  Star,
  FolderTree,
  FolderPlus,
  ChevronDown,
  ChevronRight,
  LifeBuoy,
  LogOut,
  Menu,
  X,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const location = useLocation();

  const [openCategories, setOpenCategories] = useState(false);
  const [openSubcategories, setOpenSubcategories] = useState(false);
  const [openChildCategories, setOpenChildCategories] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [openUserManage, setOpenUserManage] = useState(false);
  const [openListingManage, setOpenListingManage] = useState(false);
  const [openAdvertisementsManage, setOpenAdvertisementsManage] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
     {/* Mobile Menu Button - always on top */}
  <button
    className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow lg:hidden"
    onClick={() => setMobileOpen(true)}
  >
    <Menu className="h-6 w-6 text-gray-700" />
  </button>


     {/* Backdrop */}
  {mobileOpen && (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
      onClick={() => setMobileOpen(false)}
    />
  )}


<div
    className={cn(
      "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r overflow-y-auto transition-transform duration-300",
      mobileOpen ? "translate-x-0" : "-translate-x-full",
      "lg:translate-x-0 lg:static"
    )}
  >
         {/* Close button for mobile */}
    <div className="lg:hidden flex justify-end p-2">
      <button
        className="text-gray-500 hover:text-red-500"
        onClick={() => setMobileOpen(false)}
      >
        <X className="h-5 w-5" />
      </button>
    </div>

        {/* Logo */}
        <div className="p-0 border-b">
          <div className="flex  justify-center">
            <img src="/images/profile-icon.png" alt="Logo" className="h-20" />
          </div>
        </div>

        {/* Search input */}
        {/* <div className="p-2">
          <input
            type="text"
            placeholder="Search here"
            className="w-full px-4 py-2 border rounded-md text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div> */}

      {/* Nav links */}
      
      <nav className="p-2">
        <ul className="space-y-1">

         
          <li>
            <Link 
              to="/admin/dashboard" 
              className={cn(
                "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                isActive("/admin/dashboard") && "bg-blue-50 text-blue-600"
              )}
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
          </li>
          
          <li>
            <button 
              onClick={() => setOpenListingManage(!openListingManage)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                openListingManage && "bg-blue-50 text-blue-600"
              )}
            >
              <div className="flex items-center">
                <ClipboardList className="h-5 w-5 mr-3" />
                <span>Listing Manage</span>
              </div>
              {openListingManage ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {openListingManage && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/admin/listings" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/listings") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    All Listings
                  </Link>
                </li>
              </ul>
            )}
          </li>
          


          <li>
            <button 
              onClick={() => setOpenAdvertisementsManage(!openAdvertisementsManage)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                openAdvertisementsManage && "bg-blue-50 text-blue-600"
              )}
            >
              <div className="flex items-center">
                <PanelLeft className="h-5 w-5 mr-3" />
                <span>Advertis Manage</span>
              </div>
              {openAdvertisementsManage ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {openAdvertisementsManage && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/admin/advertisements" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/advertisements") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    All Advertise
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/advertisements/new" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/advertisements/new") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    Add NewAdvertise
                  </Link>
                </li>
              </ul>
            )}
          </li>
          


          <li>
            <button 
              onClick={() => setOpenUserManage(!openUserManage)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                openUserManage && "bg-blue-50 text-blue-600"
              )}
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3" />
                <span>User Manage</span>
              </div>
              {openUserManage ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {openUserManage && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/admin/users" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/users") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    All Users
                  </Link>
                </li>
                {/* <li>
                  <Link 
                    to="/admin/users/deactivated" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/users/deactivated") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    Deactivated Users
                  </Link>
                </li> */}
              </ul>
            )}
          </li>

          <li>
            <button 
              onClick={() => setOpenCategories(!openCategories)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                openCategories && "bg-blue-50 text-blue-600"
              )}
            >
              <div className="flex items-center">
                <FolderTree className="h-5 w-5 mr-3" />
                <span>Categories</span>
              </div>
              {openCategories ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {openCategories && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/admin/categories" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/categories") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    All Categories
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/categories/add" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/categories/add") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    Add NewCategory
                  </Link>
                </li>
              </ul>
            )}
          </li>
          


          <li>
            <button 
              onClick={() => setOpenSubcategories(!openSubcategories)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                openSubcategories && "bg-blue-50 text-blue-600"
              )}
            >
              <div className="flex items-center">
                <FolderPlus className="h-5 w-5 mr-3" />
                <span>Subcategories</span>
              </div>
              {openSubcategories ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {openSubcategories && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/admin/subcategories" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/subcategories") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    All Subcategories
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/subcategories/add" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/subcategories/add") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    Add NewSubcategory
                  </Link>
                </li>
              </ul>
            )}
          </li>


          
          {/* <li>
            <button 
              onClick={() => setOpenChildCategories(!openChildCategories)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                openChildCategories && "bg-blue-50 text-blue-600"
              )}
            >
              <div className="flex items-center">
                <FolderPlus className="h-5 w-5 mr-3" />
                <span>Child Categories</span>
              </div>
              {openChildCategories ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {openChildCategories && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/admin/child-categories" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/child-categories") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    All ChildCategories
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/child-categories/add" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/child-categories/add") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    Add NewChildCategory
                  </Link>
                </li>
              </ul>
            )}
          </li> */}
          
          <li>
            <Link 
              to="/admin/contact-us" 
              className={cn(
                "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                isActive("/admin/contact-us") && "bg-blue-50 text-blue-600"
              )}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              All Contact us
            </Link>
          </li>
          
          <li>
            <button 
              onClick={() => setOpenSupport(!openSupport)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                openSupport && "bg-blue-50 text-blue-600"
              )}
            >
              <div className="flex items-center">
                <LifeBuoy className="h-5 w-5 mr-3" />
                <span>Support</span>
              </div>
              {openSupport ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {openSupport && (
              <ul className="ml-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/admin/support/department" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/support/department") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    Department
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/support/tickets" 
                    className={cn(
                      "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                      isActive("/admin/support/tickets") && "bg-blue-50 text-blue-600"
                    )}
                  >
                    Support Ticket
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <Link 
              to="/admin/enquiries" 
              className={cn(
                "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                isActive("/admin/enquiries") && "bg-blue-50 text-blue-600"
              )}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              Enquiries
            </Link>
          </li>
          
          <li>
            <Link 
              to="/admin/links" 
              className={cn(
                "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                isActive("/admin/links") && "bg-blue-50 text-blue-600"
              )}
            >
              <LinkIcon className="h-5 w-5 mr-3" />
              Links
            </Link>
          </li>
          
          <li>
            <Link 
              to="/admin/reviews" 
              className={cn(
                "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                isActive("/admin/reviews") && "bg-blue-50 text-blue-600"
              )}
            >
              <Star className="h-5 w-5 mr-3" />
              Reviews
            </Link>
          </li>
          
          <li>
            <Link 
              to="/admin/membership" 
              className={cn(
                "flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-blue-50 hover:text-blue-600",
                isActive("/admin/membership") && "bg-blue-50 text-blue-600"
              )}
            >
              <Users className="h-5 w-5 mr-3" />
              User membership
            </Link>
          </li>
          
          <li>
            <Link 
              to="/logout" 
              className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-red-50 hover:text-red-600"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    </>
  );
};