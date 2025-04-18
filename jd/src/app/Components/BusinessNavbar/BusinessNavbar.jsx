"use client";
import React, { useRef, useEffect, useState } from "react";
import "../Navbar/navbar.css";
import Link from "next/link";
import logo from "../../Images/logo.jpg";
import Image from "next/image";
import "../../Pages/login/page";
import "./businessNavbar.css";
import UserLocation from "../UserLocation/UserLocation";

const BusinessNavbar = () => {
  const navbarCollapseRef = useRef(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

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

            {/* Desktop search bar */}
            <div className="d-none d-lg-flex business-navbar-search-container">
              <div className="hero-location-select">
                <UserLocation />
              </div>
              <input
                type="text"
                className="hero-search-input"
                placeholder={animatedText}
              />
              <button className="hero-search-btn">
                <i className="bi bi-search"></i>
              </button>
            </div>

            {/* Mobile search icon */}
            <div className="d-flex gap-3 d-lg-none">
              <button
                className="d-lg-none btn btn-link  p-0 ms-2"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
              >
                <i className="bi bi-search fs-4"></i>
              </button>

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
            </div>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
              ref={navbarCollapseRef}
            >
              <div className="d-flex align-items-center ">
                <Link
                  href="/Pages/login"
                  className="btn btn bg-primary text-white me-2"
                >
                  SignIn
                </Link>
                <Link
                  href="/Pages/signup"
                  className="btn btn bg-dark text-white me-2"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </section>

      {/* Mobile search dropdown */}
      {showMobileSearch && (
        <div className="mobile-search-slide animate__animated animate__slideInDown">
          <div className="container-fluid d-flex flex-column bg-white p-3 shadow">
            <div className="form-select mb-2">
              <UserLocation />
            </div>
            <div className="d-flex">
              <input
                type="text"
                className="form-control me-2"
                placeholder={animatedText}
              />
              <button className="btn btn-primary">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BusinessNavbar;
