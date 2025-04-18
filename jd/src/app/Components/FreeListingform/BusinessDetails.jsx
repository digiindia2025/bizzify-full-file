"use client";
import React, { useState } from "react";
import "../../Pages/freelistingform/freelistingform.css";

const BusinessDetails = ({ setKey }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    pinCode: "",
    building: "",
    street: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    direction: "",
    website: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes for all fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation check
  const validateForm = () => {
    const requiredFields = [
      "businessName", "building", "street", "area", "landmark", "city", "state", "pinCode"
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill out the ${field}.`);
        return false;
      }
    }
    return true;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    if (!validateForm()) return;

    setLoading(true);
    setError(""); // Reset error on form submission

    try {
      const response = await fetch("http://localhost:5000/api/admin/createBusinessDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      // If success, go to the next step
      setKey("category");
    } catch (err) {
      setError(err.message); // Display error if any occurs
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="section-title">
        Fill Business Details<sup>*</sup>
      </h5>

      {/* Display error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Business Name */}
      <div className="mb-3">
        <label className="form-label">
          Business Name<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="businessName"
          value={formData.businessName}
          onChange={handleChange}
        />
      </div>

      {/* Building/Block No */}
      <div className="mb-3">
        <label className="form-label">
          Building/Block No<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="building"
          value={formData.building}
          onChange={handleChange}
        />
      </div>

      {/* Street */}
      <div className="mb-3">
        <label className="form-label">
          Street/Colony Name<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="street"
          value={formData.street}
          onChange={handleChange}
        />
      </div>

      {/* Area */}
      <div className="mb-3">
        <label className="form-label">
          Area<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="area"
          value={formData.area}
          onChange={handleChange}
        />
      </div>

      {/* Landmark */}
      <div className="mb-3">
        <label className="form-label">
          Landmark<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="landmark"
          value={formData.landmark}
          onChange={handleChange}
        />
      </div>

      {/* City */}
      <div className="mb-3">
        <label className="form-label">
          City<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>

      {/* State */}
      <div className="mb-3">
        <label className="form-label">
          State<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </div>

      {/* Pin Code */}
      <div className="mb-3">
        <label className="form-label">
          Pin Code<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-100 py-3" disabled={loading}>
        {loading ? "Submitting..." : "Next"}
      </button>
    </form>
  );
};

export default BusinessDetails;
