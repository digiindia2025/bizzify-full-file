"use client";
import React, { useRef, useEffect, useState } from "react";
import "../Navbar/navbar.css";
import Link from "next/link";
import logo from "../../Images/logo.jpg";
import Image from "next/image";
import "../../Pages/login/page";
import './businessNavbar.css'

const BusinessNavbar = () => {
  const navbarCollapseRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navbarCollapseRef.current &&
        !navbarCollapseRef.current.contains(event.target)
      ) {
        const bsCollapse = new window.bootstrap.Collapse(
          navbarCollapseRef.current,
          {
            toggle: false,
          }
        );
        bsCollapse.hide();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const placeholderTexts = [
    "Search for plumbers...",
    "Find the best tutors...",
    "Looking for car services?",
    "Explore wedding planners...",
    "Find electricians near you...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animatedText, setAnimatedText] = useState("");

  useEffect(() => {
    let charIndex = 0;
    const interval = setInterval(() => {
      setAnimatedText(placeholderTexts[placeholderIndex].slice(0, charIndex));
      charIndex++;
      if (charIndex > placeholderTexts[placeholderIndex].length) {
        clearInterval(interval);
        setTimeout(() => {
          setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [placeholderIndex]);
  return (
    <>
    <section className="business-navbar">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            <Image src={logo} alt="logo" />
          </Link>
          <div className="business-navbar-search-container">
            {/* Search Input */}
            <input
              type="text"
              className="hero-search-input"
              placeholder={animatedText}
            />
            <button className="hero-search-btn">
            <i className="bi bi-search"></i> 
            </button>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span>
              <i className="bi bi-list text-white"></i>
            </span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
            ref={navbarCollapseRef}
          >
            <div className="d-flex align-items-center justify-content-end">
              <Link href="/Pages/login" className="login-btn me-2">
                SignIn / Signup
              </Link>
            </div>
            {/* ========== This is Profile code show after login please ========== */}
            {/* <div className="d-flex align-items-center ">
              <Link href="/Pages/login" className="login-btn me-2">
               My Profile
              </Link>
            </div> */}
          </div>
        </div>
      </nav>
    </section>
    </>
  );
};

export default BusinessNavbar;
