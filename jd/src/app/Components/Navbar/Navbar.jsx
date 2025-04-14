"use client";
import React, { useRef, useEffect } from "react";
import "./navbar.css";
import Link from "next/link";
import logo from "../../Images/logo.jpg";
import Image from "next/image";
import "../../Pages/login/page";

const Header = () => {
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

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        {/* <div className="navbar-top">
          <div className="bg-light border-bottom py-2 px-3 d-flex justify-content-between align-items-center flex-wrap small">
            <div className="d-flex align-items-center gap-3 mb-2 mb-md-0">
              <span><i className="bi bi-envelope me-1"></i> info@bizifffy.com</span>
              <span><i className="bi bi-telephone me-1"></i> +91 9876543210</span>
            </div>

            <div className="d-flex align-items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                <i className="bi bi-whatsapp"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

        </div> */}
        <div className="container">
          <Link className="navbar-brand" href="/">
            <Image src={logo} alt="logo" />
          </Link>
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
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            ref={navbarCollapseRef}
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Enter a website, business, or keyword"
                />
              </li> */}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/Pages/earn-with-us"
                  onClick={() => {
                    if (navbarCollapseRef.current) {
                      new window.bootstrap.Collapse(navbarCollapseRef.current, {
                        toggle: false,
                      }).hide();
                    }
                  }}
                >
                  Earn With Us
                </Link>
              </li>
              {/* <li
                className={`nav-item webdesign ${services ? "active" : ""}`}
              >
                <Link
                  className="nav-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleServices();
                  }}
                >
                  Category <i className="bi bi-chevron-down"></i>
                </Link>
                {services && (
                  <div className="dropMain">
                    <div className="container py-2">
                      <div className="row">
                        <p><b>Categories</b></p>
                        {categories.map((service, index) => (
                          <div key={index} className="col-lg-4 col-md-3 col-sm-4 col-6">
                            <div className="service">
                              <Link
                                href={service.link}
                                onClick={() => {
                                  setServices(false);
                                }}
                              >
                                <h6>{service.name}</h6>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </li> */}
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/Pages/corporate-advertise"
                  onClick={() => {
                    if (navbarCollapseRef.current) {
                      new window.bootstrap.Collapse(navbarCollapseRef.current, {
                        toggle: false,
                      }).hide();
                    }
                  }}
                >
                  Corporate Advertise
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/Pages/free-listing"
                  onClick={() => {
                    if (navbarCollapseRef.current) {
                      new window.bootstrap.Collapse(navbarCollapseRef.current, {
                        toggle: false,
                      }).hide();
                    }
                  }}
                >
                  Free Listing
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  href="/Pages/bussiness-listing"
                  onClick={() => {
                    if (navbarCollapseRef.current) {
                      new window.bootstrap.Collapse(navbarCollapseRef.current, {
                        toggle: false,
                      }).hide();
                    }
                  }}
                >
                  My Business
                </Link>
              </li>
            </ul>
            <div className="d-flex align-items-center ">
              <Link href="/Pages/login" className="btn btn bg-primary text-white me-2">
                SignIn
              </Link>
              <Link href="/Pages/signup" className="btn btn bg-dark text-white me-2">
                Register
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
    </>
  );
};

export default Header;
