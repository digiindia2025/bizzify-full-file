"use client";
import React, { useState } from "react";
import logo from "../../Images/logo.jpg";
import Image from "next/image";
import "../../Pages/login/login.css";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/navigation";
import './signup.css'
const Page = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setErrors({ ...errors, [name]: "" });
  };

  // const validate = () => {
  //   const newErrors = {};
  //   const { fullName, email, phone, password, confirmPassword } = formData;

  //   if (!fullName.trim()) newErrors.fullName = "Full Name is required.";
  //   if (!email) {
  //     newErrors.email = "Email is required.";
  //   } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
  //     newErrors.email = "Invalid email format.";
  //   }

  //   if (!phone) {
  //     newErrors.phone = "Phone number is required.";
  //   } else if (!/^\d{10}$/.test(phone)) {
  //     newErrors.phone = "Phone number must be 10 digits.";
  //   }

  //   if (!password) {
  //     newErrors.password = "Password is required.";
  //   } else if (
  //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)
  //   ) {
  //     newErrors.password =
  //       "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
  //   }

  //   if (!confirmPassword) {
  //     newErrors.confirmPassword = "Please confirm your password.";
  //   } else if (password !== confirmPassword) {
  //     newErrors.confirmPassword = "Passwords do not match.";
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) return;

    try {
      const { fullName, email, phone, password, confirmPassword } = formData;

      const response = await axios.post(
        "http://localhost:5000/api/admin/users",
        {
          fullName,
          email,
          phone,
          password,
          confirmPassword,
        }
      );

      console.log("API response:", response.data);
      alert("Registration successful!");
      router.push("/Pages/login");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "An error occurred during registration.";
      alert(message);
    }
  };

  return (
    <>
      <Head>
        <title>Sign Up | Create Your Free Biziffy Account</title>
        <meta
          name="description"
          content="Create your free Biziffy account today! List your business, manage your profile, and start generating high-quality leads through local SEO and digital visibility."
        />
        <meta property="og:title" content="Sign Up | Biziffy" />
        <meta
          property="og:description"
          content="Register for a free Biziffy account and start listing your business to generate leads and grow online."
        />
        <meta property="og:url" content="https://biziffy.com/signup" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Biziffy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sign Up | Biziffy" />
        <meta
          name="twitter:description"
          content="Join Biziffy to promote your business online and connect with potential customers through local SEO."
        />
        <meta name="twitter:creator" content="@biziffy" />
      </Head>

      <div className="container py-3">
        <div className="row align-items-center">
        <div className="col-md-6 p-0">
              <div className="login-welcome-content d-flex flex-column justify-content-center align-items-center h-100 px-4 py-2">
                <div className="login-welcome-text text-center">
                  <div className="login-welcome-icon">
                    <i className="bi bi-person-plus-fill fs-1 glow-icon"></i>
                  </div>
                  <h1 className="display-5 fw-bold mb-3">
                    Welcome to Bizi<span style={{ color: 'var(--blue)' }}>ff</span>y
                  </h1>
                  <p className="lead">
                    Your all-in-one platform to manage <strong>tasks</strong>, grow your <strong>business</strong>, and connect with <strong>local clients</strong>.
                  </p>
                  <hr className="border-light w-50 mx-auto" />
                  <p className="small fst-italic">
                    Empowering service providers, one click at a time.
                  </p>
                </div>
              </div>
            </div>


          <div className="col-md-6">
            <div className="auth-section">
              <div className="auth-card">
                <div className="text-center mb-3">
                  <h4>Register Now</h4>
                  <p>Create an account to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    className="mb-3 login-input"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {/* {errors.fullName && <p className="validation-text">{errors.fullName}</p>} */}

                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="mb-3 login-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {/* {errors.email && <p className="validation-text">{errors.email}</p>} */}

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone No."
                    className="mb-3 login-input"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {/* {errors.phone && <p className="validation-text">{errors.phone}</p>} */}

                  <div className="position-relative mb-3">
                    <input
                      type={showPassword.password ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="login-input w-100"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <span
                      className="show-password-btn position-absolute"
                      style={{
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() => togglePasswordVisibility("password")}
                    >
                      <i
                        className={`bi ${
                          showPassword.password ? "bi-eye" : "bi-eye-slash"
                        }`}
                      ></i>
                    </span>
                  </div>
                  {/* {errors.password && <p className="validation-text">{errors.password}</p>} */}

                  <div className="position-relative mb-3">
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      className="login-input w-100"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <span
                      className="show-password-btn position-absolute"
                      style={{
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        togglePasswordVisibility("confirmPassword")
                      }
                    >
                      <i
                        className={`bi ${
                          showPassword.confirmPassword
                            ? "bi-eye"
                            : "bi-eye-slash"
                        }`}
                      ></i>
                    </span>
                  </div>
                  {/* {errors.confirmPassword && <p className="validation-text">{errors.confirmPassword}</p>} */}

                  <button className="login-btn bg-dark text-white border-0 w-100 mb-3">
                    Get Started
                  </button>

                  <p className="text-center">
                    Already have an account?{" "}
                    <Link href="/Pages/login" className="text-primary">
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
