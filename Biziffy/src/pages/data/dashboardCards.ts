
/**
 * Dashboard card templates for admin dashboard
 */
import { LucideIcon } from 'lucide-react';
import {
  ShoppingCart,
  Image,
  Users,
  FolderTree,
  FolderPlus,
  MessageSquare,
  LifeBuoy,
  Link as LinkIcon,
  Star,
  PanelLeft
} from 'lucide-react';

// Define a type for dashboard cards
export interface DashboardCardTemplate {
  key: string;
  title: string;
  icon: LucideIcon;
  description: string;
  linkTo: string;
  visible?: boolean;
  colorClass?: string;
  size?: 'small' | 'medium' | 'large';
  titleFontSize?: string;
  order?: number;
}

const dashboardCardTemplates: DashboardCardTemplate[] = [
  {
    key: "listings",
    title: "Listings",
    icon: ShoppingCart,
    description: "Manage all your listings",
    linkTo: "/admin/listings",
    visible: true,
    colorClass: "bg-gradient-to-r from-blue-500 to-blue-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 1
  },
  {
    key: "advertisements",
    title: "Advertisements",
    icon: PanelLeft,
    description: "Manage advertisement content",
    linkTo: "/admin/advertisements",
    visible: true,
    colorClass: "bg-gradient-to-r from-purple-500 to-purple-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 2
  },
  {
    key: "users",
    title: "Users",
    icon: Users,
    description: "Manage registered users",
    linkTo: "/admin/users",
    visible: true,
    colorClass: "bg-gradient-to-r from-green-500 to-green-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 3
  },
  {
    key: "categories",
    title: "Categories",
    icon: FolderTree,
    description: "Manage product categories",
    linkTo: "/admin/categories",
    visible: true,
    colorClass: "bg-gradient-to-r from-red-500 to-red-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 4
  },
  {
    key: "subcategories",
    title: "Subcategories",
    icon: FolderPlus,
    description: "Manage product subcategories",
    linkTo: "/admin/subcategories",
    visible: true,
    colorClass: "bg-gradient-to-r from-indigo-500 to-indigo-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 5
  },
  {
    key: "Cities Manage",
    title: "Cities Manage",
    icon: FolderPlus,
    description: "Cities Manage",
    linkTo: "/admin/cities",
    visible: true,
    colorClass: "bg-gradient-to-r from-yellow-500 to-yellow-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 6
  },
  {
    key: "contacts",
    title: "Contact Messages",
    icon: MessageSquare,
    description: "View contact form submissions",
    linkTo: "/admin/contact-us",
    visible: true,
    colorClass: "bg-gradient-to-r from-pink-500 to-pink-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 7
  },
  {
    key: "supports",
    title: "Support Tickets",
    icon: LifeBuoy,
    description: "Manage support tickets",
    linkTo: "/admin/support/tickets",
    visible: true,
    colorClass: "bg-gradient-to-r from-teal-500 to-teal-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 8
  },
  {
    key: "enquiries",
    title: "Enquiries",
    icon: MessageSquare,
    description: "Respond to customer enquiries",
    linkTo: "/admin/enquiries",
    visible: true,
    colorClass: "bg-gradient-to-r from-orange-500 to-orange-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 9
  },
  {
    key: "links",
    title: "Links",
    icon: LinkIcon,
    description: "Manage site links",
    linkTo: "/admin/links",
    visible: true,
    colorClass: "bg-gradient-to-r from-cyan-500 to-cyan-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 10
  },
  {
    key: "reviews",
    title: "Reviews",
    icon: Star,
    description: "Manage product reviews",
    linkTo: "/admin/reviews",
    visible: true,
    colorClass: "bg-gradient-to-r from-lime-500 to-lime-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 11
  },
  {
    key: "memberships",
    title: "Memberships",
    icon: Users,
    description: "Manage user memberships",
    linkTo: "/admin/membership",
    visible: true,
    colorClass: "bg-gradient-to-r from-amber-500 to-amber-700",
    size: "medium",
    titleFontSize: "text-lg",
    order: 12
  }
];

export default dashboardCardTemplates;