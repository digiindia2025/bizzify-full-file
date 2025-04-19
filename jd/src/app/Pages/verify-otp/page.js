"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

const VerifyOtpPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/verify-otp", {
        email,
        otp,
      });

      alert("OTP Verified Successfully!");
      router.push("/Pages/login");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center py-5">
      <div className="auth-card w-100" style={{ maxWidth: "400px" }}>
        <h4 className="text-center mb-3">Verify OTP</h4>
        <p className="text-center">We sent a verification code to <strong>{email}</strong></p>

        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            placeholder="Enter OTP"
            className="login-input mb-2"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          {error && <p className="validation-text text-danger">{error}</p>}

          <button className="login-btn w-100">Verify & Continue</button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
