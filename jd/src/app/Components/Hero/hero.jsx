"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import "./hero.css";
import UserLocation from "../UserLocation/UserLocation";

const Hero = () => {
  const placeholderTexts = [
    "Search for plumbers...",
    "Find the best tutors...",
    "Looking for car services?",
    "Explore wedding planners...",
    "Find electricians near you...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [animatedText, setAnimatedText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState("Locaion");

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
    <section className="some-page-hero-bg">
      <div className="container">
        <div className="hero-main">
          <div className="row">
            {/* Left Content */}
            <div className="col-md-12">
              <div className="hero-content">
                <h1 className="hero-title">
                  We Are Connecting! <span>Stay Hold</span> Your
                  Success is Near.
                </h1>

                <div className="hero-search-bar">
                  <div className="hero-search-container">
                    {/* Location Picker */}
                    <div className="hero-location-picker">
                      <UserLocation />
                    </div>

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
                </div>

                <div className="hero-buttons">
                  <Link href="#" className="herobutton1">
                    Submit Website
                  </Link>
                  <Link href="#" className="herobutton2">
                    List Your Business
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Image */}
            {/* <div className="col-lg-5 col-md-12 d-flex justify-content-center position-relative">
            <div className="hero-image-container">
              <Image
                src={heroimage2}
                alt="Hero Illustration"
                layout="intrinsic"
                className="hero-background-shape"
              />
              <Image
                src={blueImage}
                alt="Background Shape"
                layout="intrinsic"
                className="hero-animated-image"
              />
            </div>
          </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
