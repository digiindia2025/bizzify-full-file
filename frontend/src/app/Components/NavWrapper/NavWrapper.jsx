"use client";
import { usePathname } from "next/navigation";
import BusinessNavbar from "../BusinessNavbar/BusinessNavbar";
import Header from "../Navbar/Navbar";

export default function NavWrapper() {
  const pathname = usePathname();
  return pathname === "/Pages/bussiness-listing" ? (
    <BusinessNavbar />
  ) : (
    <Header />
  );
}
