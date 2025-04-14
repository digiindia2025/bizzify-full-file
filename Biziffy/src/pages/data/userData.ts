// src/pages/data/userData.ts

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: "Active" | "Inactive";
}

export const users: UserData[] = [
  { id: 1, name: "Aman Tiwari", email: "aman@gmail.com", phone: "9031359720", status: "Active" },
  { id: 2, name: "Gourav", email: "gourav@gmail.com", phone: "9031359720", status: "Inactive" },
  { id: 3, name: "Vishnu", email: "Vishnu@gmail.com", phone: "9031359720", status: "Active" },
  { id: 4, name: "Nitin", email: "nitin@gmail.com", phone: "9031359720", status: "Inactive" },
  { id: 5, name: "Anjali Sharma", email: "anjali@gmail.com", phone: "9876543210", status: "Active" },
  { id: 6, name: "Rohan Verma", email: "rohan@gmail.com", phone: "8765432109", status: "Inactive" },
  { id: 7, name: "Priya Gupta", email: "priya@gmail.com", phone: "7654321098", status: "Active" },
  { id: 8, name: "Kunal Singh", email: "kunal@gmail.com", phone: "6543210987", status: "Inactive" },
  { id: 9, name: "Sneha Patel", email: "sneha@gmail.com", phone: "5432109876", status: "Active" },
  { id: 10, name: "Rajesh Yadav", email: "rajes@gmail.com", phone: "4321098765", status: "Inactive" },
  { id: 11, name: "Shweta Kumari", email: "shweta@gmail.com", phone: "3210987654", status: "Active" },
  { id: 12, name: "Vikram Mehra", email: "vikram@gmail.com", phone: "2109876543", status: "Inactive" },
];
