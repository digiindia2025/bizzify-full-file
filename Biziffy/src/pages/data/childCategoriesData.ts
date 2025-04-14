export interface ChildCategoryData {
  id: number;
  childCategory: string;
  image: string;
  subcategory: string;
  mainCategory: string;
  status: "active" | "inactive";
  createDate: string;
}

export const childCategoriesData: ChildCategoryData[] = [
  {
    id: 1,
    childCategory: "Burger",
    image: "/images/profile-icon.png",
    subcategory: "Fast Food",
    mainCategory: "Food",
    status: "active",
    createDate: "31-03-2025"
  },
  {
    id: 2,
    childCategory: "Laptop",
    image: "/images/profile-icon.png",
    subcategory: "Electronics",
    mainCategory: "Gadgets",
    status: "inactive",
    createDate: "30-03-2025"
  },
  {
    id: 3,
    childCategory: "Shampoo",
    image: "/images/profile-icon.png",
    subcategory: "Hair Care",
    mainCategory: "Beauty",
    status: "active",
    createDate: "29-03-2025"
  },
  {
    id: 4,
    childCategory: "T-shirt",
    image: "/images/profile-icon.png",
    subcategory: "Clothing",
    mainCategory: "Fashion",
    status: "active",
    createDate: "28-03-2025"
  },
  {
    id: 5,
    childCategory: "Mobile Cover",
    image: "/images/profile-icon.png",
    subcategory: "Accessories",
    mainCategory: "Mobile",
    status: "inactive",
    createDate: "27-03-2025"
  },
  {
    id: 6,
    childCategory: "Sofa Set",
    image: "/images/profile-icon.png",
    subcategory: "Living Room",
    mainCategory: "Furniture",
    status: "active",
    createDate: "26-03-2025"
  },
  {
    id: 7,
    childCategory: "Action Figure",
    image: "/images/profile-icon.png",
    subcategory: "Toys",
    mainCategory: "Kids",
    status: "active",
    createDate: "25-03-2025"
  },
  {
    id: 8,
    childCategory: "Sneakers",
    image: "/images/profile-icon.png",
    subcategory: "Footwear",
    mainCategory: "Shoes",
    status: "inactive",
    createDate: "24-03-2025"
  },
  {
    id: 9,
    childCategory: "Headphones",
    image: "/images/profile-icon.png",
    subcategory: "Audio",
    mainCategory: "Tech",
    status: "active",
    createDate: "23-03-2025"
  },
  {
    id: 10,
    childCategory: "Notebook",
    image: "/images/profile-icon.png",
    subcategory: "Stationery",
    mainCategory: "Office",
    status: "inactive",
    createDate: "22-03-2025"
  }
];
