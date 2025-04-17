
  import { Toaster } from "@/components/ui/toaster";
  import { Toaster as Sonner } from "@/components/ui/sonner";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import { AuthProvider } from "@/contexts/AuthContext";
  import { ProtectedRoute } from "@/components/Auth/ProtectedRoute";

  // Pages
  import Login from "./pages/Login";
  // import Dashboardmain from "./pages/admin/Dashboardmain";
  import Dashboard from "./pages/admin/Dashboard";
  // import DashboardManager from "./pages/admin/DashboardManager";
  import Membership from "./pages/admin/Membership";
  import Reviews from "./pages/admin/Reviews";
  import Links from "./pages/admin/Links";
  import Enquiries from "./pages/admin/Enquiries";
  import SupportTickets from "./pages/admin/SupportTickets";
  import Departments from "./pages/admin/Departments";
  import ContactUs from "./pages/admin/ContactUs";
  // import ChildCategories from "./pages/admin/ChildCategories";
  // import AddChildCategory from "./pages/admin/AddChildCategory";
  import ListingDetails from "./pages/admin/ListingDetails";
  import AllListings from "./pages/admin/AllListings";
  import AllAdvertisements from "./pages/admin/AllAdvertisements";
  import AddNewAdvertisement from "./pages/admin/AddNewAdvertisement";
  import AllUsers from "./pages/admin/AllUsers";
  import DeactivatedUsers from "./pages/admin/DeactivatedUsers";
  import AllCategories from "./pages/admin/AllCategories";
  import AddNewCategories from "./pages/admin/AddNewCategory";
  import AllSubcategories from "./pages/admin/AllSubcategories";
  import AddNewSubcategory from "./pages/admin/AddNewSubcategory";
  import UserDetails from "./pages/admin/UserDetails";
  import AllCities from "./pages/admin/AllCities";
  import CreateCity from "./pages/admin/CreateCity";
  import AllSubCities from "./pages/admin/AllSubCities";
  import CreateSubCity from "./pages/admin/CreateSubCity";
  import EditCity from "./pages/admin/EditCity";
  import EditSubCity from "./pages/admin/EditSubCity";

  // Pages - Collections
  import PopularCities from "./pages/admin/PopularCities";
  import AddPopularCity from "./pages/admin/AddPopularCity";
// import AddPopularCity from "./pages/admin/PopularCities";
import EditPopularCity from "./pages/admin/EditPopularCity";
import Collections from "./pages/admin/Collections";
import AddCollection from "./pages/admin/AddCollection";
import EditCollection from "./pages/admin/EditCollection";
import Deals from "./pages/admin/Deals";
import AddDeal from "./pages/admin/AddDeal";
import EditDeal from "./pages/admin/EditDeal";
    import NotFound from "./pages/NotFound";


  const queryClient = new QueryClient();

  const App = () => (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              {/* <Route path="/admin" element={<ProtectedRoute><Dashboardmain /></ProtectedRoute>} /> */}
              <Route path="/admin/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              {/* <Route path="/admin/DashboardManager" element={<ProtectedRoute><DashboardManager /></ProtectedRoute>} /> */}
              <Route path="/admin/listings" element={<ProtectedRoute><AllListings /></ProtectedRoute>} />
              <Route path="/admin/listings/details/:id" element={<ProtectedRoute><ListingDetails /></ProtectedRoute>} />
              <Route path="/admin/membership" element={<ProtectedRoute><Membership /></ProtectedRoute>} />
              <Route path="/admin/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
              <Route path="/admin/links" element={<ProtectedRoute><Links /></ProtectedRoute>} />
              <Route path="/admin/enquiries" element={<ProtectedRoute><Enquiries /></ProtectedRoute>} />
              <Route path="/admin/support/tickets" element={<ProtectedRoute><SupportTickets /></ProtectedRoute>} />
              <Route path="/admin/support/department" element={<ProtectedRoute><Departments /></ProtectedRoute>} />
              <Route path="/admin/contact-us" element={<ProtectedRoute><ContactUs /></ProtectedRoute>} />
              {/* <Route path="/admin/child-categories" element={<ProtectedRoute><ChildCategories /></ProtectedRoute>} /> */}
              {/* <Route path="/admin/child-categories/add" element={<ProtectedRoute><AddChildCategory /></ProtectedRoute>} /> */}
              <Route path="/admin/advertisements" element={<ProtectedRoute><AllAdvertisements /></ProtectedRoute>} />
              <Route path="/admin/advertisements/new" element={<ProtectedRoute><AddNewAdvertisement /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><AllUsers /></ProtectedRoute>} />
              <Route path="/admin/users/deactivated" element={<ProtectedRoute><DeactivatedUsers /></ProtectedRoute>} />
              <Route path="/admin/categories" element={<ProtectedRoute><AllCategories /></ProtectedRoute>} />
              <Route path="/admin/categories/add" element={<ProtectedRoute><AddNewCategories /></ProtectedRoute>} />
              <Route path="/admin/subcategories" element={<ProtectedRoute><AllSubcategories /></ProtectedRoute>} />
              <Route path="/admin/subcategories/add" element={<ProtectedRoute><AddNewSubcategory /></ProtectedRoute>} />
              <Route path="/admin/users/:id" element={<ProtectedRoute><UserDetails /></ProtectedRoute>} />              {/* Other Routes */}
              {/* Add other routes here as needed */}
              {/* City Management Routes */}
            <Route path="/admin/cities" element={<ProtectedRoute><AllCities /></ProtectedRoute>} />
            <Route path="/admin/cities/create" element={<ProtectedRoute><CreateCity /></ProtectedRoute>} />
            <Route path="/admin/subcities" element={<ProtectedRoute><AllSubCities /></ProtectedRoute>} />
            <Route path="/admin/subcities/create" element={<ProtectedRoute><CreateSubCity /></ProtectedRoute>} />
            <Route path="/admin/cities/edit/:id" element={<ProtectedRoute><EditCity /></ProtectedRoute>} />
            <Route path="/admin/subcities/edit/:id" element={<ProtectedRoute><EditSubCity /></ProtectedRoute>} />
              
              {/* Dashboard Route */}
            {/* Content Management Routes */}
            <Route path="/admin/popular-cities" element={<ProtectedRoute><PopularCities /></ProtectedRoute>} />
            <Route path="/admin/popular-cities/add" element={<ProtectedRoute><AddPopularCity /></ProtectedRoute>} />  
            <Route path="/admin/popular-cities/edit/:id" element={<ProtectedRoute><EditPopularCity /></ProtectedRoute>} />
            <Route path="/admin/collections" element={<ProtectedRoute><Collections /></ProtectedRoute>} />
            <Route path="/admin/collections/add" element={<ProtectedRoute><AddCollection /></ProtectedRoute>} />
            <Route path="/admin/collections/edit/:id" element={<ProtectedRoute><EditCollection /></ProtectedRoute>} />
            <Route path="/admin/deals" element={<ProtectedRoute><Deals /></ProtectedRoute>} />
            <Route path="/admin/deals/add" element={<ProtectedRoute><AddDeal /></ProtectedRoute>} />
            <Route path="/admin/deals/edit/:id" element={<ProtectedRoute><EditDeal /></ProtectedRoute>} />
              {/* Membership Route */}
              
              {/* Logout Route */}
              <Route 
                path="/logout" 
                element={
                  <ProtectedRoute>
                    <Login />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );

  export default App;
