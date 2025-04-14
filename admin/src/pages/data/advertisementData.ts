export interface Advertisement {
  id: number;
  category: string;
  title: string;
  type: string;
  status: string;
  imageUrl: string;
}

export const initialAdvertisements: Advertisement[] = [
  { id: 1, category: "Advertising & Marketing", title: "Digi India Digital", type: "listener", status: "Active", imageUrl: "/images/profile-icon.png" },
  { id: 2, category: "Advertising & Marketing", title: "Just Dial Adds", type: "Listing", status: "Active", imageUrl: "/images/profile-icon.png" },
  { id: 3, category: "Gifting", title: "bizziffy adds make", type: "detail", status: "Active", imageUrl: "/images/profile-icon.png" },
  { id: 4, category: "Gifting", title: "ask me acookies adds", type: "detail", status: "Active", imageUrl: "/images/profile-icon.png" },
  { id: 5, category: "Daily Home Needs", title: "think.aman addvertise", type: "Listing", status: "Active", imageUrl: "/images/profile-icon.png" },
  { id: 6, category: "Gifting", title: "Bizziffy deal promo", type: "detail", status: "Inactive", imageUrl: "/images/profile-icon.png" },
  { id: 7, category: "Food", title: "Tasty Bites", type: "listener", status: "Active", imageUrl: "/images/profile-icon.png" },
  { id: 8, category: "Services", title: "UrbanClap Home Fix", type: "Listing", status: "Inactive", imageUrl: "/images/profile-icon.png" },
];
