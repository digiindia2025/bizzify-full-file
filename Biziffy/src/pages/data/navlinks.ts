// data/navlinks.ts
// import {
//     LayoutDashboard,
//     ClipboardList,
//     Users,
//     MessageSquare,
//     PanelLeft,
//     Link as LinkIcon,
//     Star,
//     FolderTree,
//     FolderPlus,
//     LifeBuoy,
//     LogOut,
//   } from "lucide-react";
  
//   interface NavLink {
//     label: string;
//     icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//     to?: string;
//     onClick?: () => void;
//     children?: NavLink[];
//   }
  
//   export const navLinks: NavLink[] = [
//     {
//       label: "Dashboard",
//       icon: LayoutDashboard,
//       to: "/admin/dashboard",
//     },
//     {
//       label: "Listing Manage",
//       icon: ClipboardList,
//       children: [
//         {
//           label: "All Listings",
//           to: "/admin/listings",
//         },
//       ],
//     },
//     {
//       label: "Advertis Manage",
//       icon: PanelLeft,
//       children: [
//         {
//           label: "All Advertise",
//           to: "/admin/advertisements",
//         },
//         {
//           label: "Add NewAdvertise",
//           to: "/admin/advertisements/new",
//         },
//       ],
//     },
//     {
//       label: "User Manage",
//       icon: Users,
//       children: [
//         {
//           label: "All Users",
//           to: "/admin/users",
//         },
//         {
//           label: "Deactivated Users",
//           to: "/admin/users/deactivated",
//         },
//       ],
//     },
//     {
//       label: "Categories",
//       icon: FolderTree,
//       children: [
//         {
//           label: "All Categories",
//           to: "/admin/categories",
//         },
//         {
//           label: "Add NewCategory",
//           to: "/admin/categories/add",
//         },
//       ],
//     },
//     {
//       label: "Subcategories",
//       icon: FolderPlus,
//       children: [
//         {
//           label: "All Subcategories",
//           to: "/admin/subcategories",
//         },
//         {
//           label: "Add NewSubcategory",
//           to: "/admin/subcategories/add",
//         },
//       ],
//     },
//     {
//       label: "Child Categories",
//       icon: FolderPlus,
//       children: [
//         {
//           label: "All ChildCategories",
//           to: "/admin/child-categories",
//         },
//         {
//           label: "Add NewChildCategory",
//           to: "/admin/child-categories/add",
//         },
//       ],
//     },
//     {
//       label: "All Contact us",
//       icon: MessageSquare,
//       to: "/admin/contact-us",
//     },
//     {
//       label: "Support",
//       icon: LifeBuoy,
//       children: [
//         {
//           label: "Department",
//           to: "/admin/support/department",
//         },
//         {
//           label: "Support Ticket",
//           to: "/admin/support/tickets",
//         },
//       ],
//     },
//     {
//       label: "Enquiries",
//       icon: MessageSquare,
//       to: "/admin/enquiries",
//     },
//     {
//       label: "Links",
//       icon: LinkIcon,
//       to: "/admin/links",
//     },
//     {
//       label: "Reviews",
//       icon: Star,
//       to: "/admin/reviews",
//     },
//     {
//       label: "User membership",
//       icon: Users,
//       to: "/admin/membership",
//     },
//     {
//       label: "Log Out",
//       icon: LogOut,
//       to: "/logout",
//     },
//   ];