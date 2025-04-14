"use client";
import Link from "next/link";
import Image from "next/image";
import "./footer.css";
import logo from "../../Images/logo.jpg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Logo & Social Media */}
          <div className="col-lg-3 col-md-6 col-6 footer-section">
            <Image src={logo} className="footer-logo" alt="Biziffy Logo" />
            <p className="footer-description">
              Your trusted partner in digital solutions.
            </p>
            <div className="social-icons">
              <Link href="#">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link href="#">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link href="#">
                <i className="bi bi-linkedin"></i>
              </Link>
              <Link href="#">
                <i className="bi bi-instagram"></i>
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-lg-2 col-md-6 col-6 footer-section">
            <h5>Company</h5>
            <ul>
              <li>
                <Link href="/Pages/aboutus">About Us</Link>
              </li>
              <li>
                <Link href="/Pages/Profile">Profile</Link>
              </li>
              <li>
                <Link href="/Pages/contact-us">Contact Us</Link>
              </li>
              <li>
                <Link href="/Pages/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/Pages/term-and-conditions">Term & Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 col-6 footer-section">
            <h5>Services</h5>
            <ul>
              <li>
                <Link href="#">Digital Marketing</Link>
              </li>
              <li>
                <Link href="#">SEO Services</Link>
              </li>
              <li>
                <Link href="#">PPC Consulting</Link>
              </li>
              <li>
                <Link href="#">Free SEO Test</Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-6 col-6 footer-section">
            <h5>Resources</h5>
            <ul>
              <li>
                <Link href="#">SEO FAQ</Link>
              </li>
              <li>
                <Link href="#">Ecommerce SEO Guide</Link>
              </li>
              <li>
                <Link href="#">Construction SEO Guide</Link>
              </li>
            </ul>
          </div>

          {/* Member Section */}
          <div className="col-lg-3 col-md-6 footer-section">
            <h5>Biziffy Members</h5>
            <div className="footer-buttons">
              <Link href="/Pages/login" className="footer-login-btn">
                Log In
              </Link>
              <Link href="/Pages/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
            <p>Find and connect with businesses near you.</p>
          </div>
        </div>
        <hr />
        <div className="footer-bottom text-center">
          <p>© 2025 Biziffy Media Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
