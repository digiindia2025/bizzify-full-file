"use client";
import React, { useState } from "react";
import "./login.css";
// import logo from "../../Images/logo.jpg"; 
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'; // Import correct components
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;
    console.log(`Field Changed: ${name} =>`, updatedValue);
  
    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  

  const validate = () => {
    const newErrors = {};
    const { email, password } = formData;
  
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format.";
    }
  
    if (!password) {
      newErrors.password = "Password is required.";
    }
  
    console.log("Validation Errors:", newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Form submitted with:", formData);

  if (!validate()) return;

  setIsLoading(true);
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email.trim(),
        password: formData.password.trim(),
      }),
    });


    const data = await response.json();
    console.log("API Responses:", data);

    if (response.ok) {
      setSuccessMessage("Login successful! Redirecting...");
      setLoginError("");
      console.log("Redirecting to /dashboard...");
      setTimeout(() => {
        window.location.href = "/Pages/Profile";
      }, 1500);
    } else {
      setLoginError(data.message || "Something went wrong.");
      setSuccessMessage("");
    }
  } catch (error) {
    console.error("Login Error:", error);
    setLoginError("An error occurred while logging in.");
    setSuccessMessage("");
  } finally {
    setIsLoading(false);
  }
};


  // Google Login Success handler
  const handleGoogleLoginSuccess = async (response) => {
    console.log("Google Login Success:", response);
  
    try {
      const res = await fetch("http://localhost:5000/api/user/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenId: response.credential,
        }),
      });
  
      const data = await res.json();
      console.log("Google API Response:", data);
  
      if (res.ok) {
        localStorage.setItem("biziffyToken", data.token);
        localStorage.setItem("biziffyUser", JSON.stringify(data.user));
        setSuccessMessage("Google login successful!");
        setLoginError("");
  
        console.log("Redirecting to /profile...");
        setTimeout(() => {
          router.push("/profile");
        }, 1500);
      } else {
        setLoginError(data.message || "Google login failed.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      setLoginError("Something went wrong with Google login.");
    }
  };
  

  // Google Login Failure handler
  const handleGoogleLoginFailure = (error) => {
    console.error("Google login error:", error);
    setLoginError("Google login failed. Please try again.");
  };

  return (
    <>
      <Head>
        <title>User Login | Access Your Biziffy Account</title>
        <meta
          name="description"
          content="Securely log in to your Biziffy account to manage your business listing, update details, track leads, and more."
        />
      </Head>

      <GoogleOAuthProvider clientId="661854954437-f33rophi4o9m1fq2s3t67ankarrhpa38.apps.googleusercontent.com"> {/* Provide your Google client ID here */}
        <section className="login-section">
          <div className="container py-3">
            <div className="row align-items-center">
            <div className="col-md-6 p-0">
              <div className="login-welcome-content  d-flex flex-column justify-content-center align-items-center h-100 px-4 position-relative login-welcome-bg">

                {/* Optional Floating Icon/Illustration */}
                <div className="login-welcome-icon">
                  <i className="bi bi-briefcase-fill fs-1  glow-icon"></i>
                </div>

                <div className="login-welcome-text text-center">
                <h1 className="display-5 fw-bold mb-3">
                  Welcome Back to Bizi<span style={{color:'var(--blue)'}}>ff</span>y
                </h1>
                  <p className="lead mb-2">
                    Manage your work like a pro — <br /> login to access your dashboard, tasks, and tools.
                  </p>
                  <p className="small fst-italic">
                    Trusted by hundreds of service providers. Be part of the future.
                  </p>
                </div>

                {/* Optional: Animated Background or glow effects */}
                <div className="animated-bg-gradient"></div>
              </div>
            </div>

              <div className="col-md-6">
                <div className="auth-section">
                  <div className="auth-card">
                    <div className="text-center mb-3">
                      {/* <Image src={logo} alt="logo" width={80} height={80} /> */}
                      <h4 className="mt-2">Welcome Back!</h4>
                      <p>Sign in to continue</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="login-input mb-3"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && <p className="text-danger">{errors.email}</p>}

                      <div className="password-input mb-3 position-relative">
                        <input
                          type={showPassword ? "text" : "password"}
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
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <i className="bi bi-eye"></i>
                          ) : (
                            <i className="bi bi-eye-slash"></i>
                          )}
                        </span>
                      </div>
                      {errors.password && <p className="text-danger">{errors.password}</p>}

                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="rememberMe"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleChange}
                          />
                          <label className="form-check-label" htmlFor="rememberMe">
                            Remember me
                          </label>
                        </div>
                        <Link href="/Pages/forgot-password" className="text-decoration-none">
                          Forgot Password?
                        </Link>
                      </div>

                      <button type="submit" className="login-btn bg-primary text-white w-100">
                        Login
                      </button>

                      {loginError && (
                        <p className="text-danger text-center mt-3">{loginError}</p>
                      )}
                      {successMessage && (
                        <p className="text-success text-center mt-3">{successMessage}</p>
                      )}

                      <p className="text-center mt-3">
                        Don’t have an account?{" "}
                        <Link href="/Pages/signup" className="text-primary">
                          Register
                        </Link>
                      </p>
                    </form>

                    {/* Google Login Button */}
                    <div className="text-center mt-1 w-1/4 mx-auto pt-2 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-all">
                      <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginFailure}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </GoogleOAuthProvider>
    </>
  );
};

export default Login;
