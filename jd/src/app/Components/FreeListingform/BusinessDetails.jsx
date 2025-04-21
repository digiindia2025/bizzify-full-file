"use client";
import React, { useState } from "react";
import "../../Pages/freelistingform/freelistingform.css";

const BusinessDetails = ({ setKey, formData, setFormData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, businessDetails: { ...formData.businessDetails, [e.target.name]: e.target.value, }, });
  };

  const validateForm = () => {
    const requiredFields = ["businessName", "building", "street", "area", "landmark", "city", "state", "pinCode",];

    for (let field of requiredFields) {
      if (!formData.businessDetails?.[field]) {
        setError(`Please fill out the ${field}.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      // Uncomment and modify API call if needed
      // const response = await fetch("/api/submit", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Something went wrong!");
      // }

      setKey("category");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const details = formData.businessDetails || {};

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="section-title">
        Fill Business Details<sup>*</sup>
      </h5>

      {error && <div className="alert alert-danger">{error}</div>}

      {[
        { label: "Business Name", name: "businessName" }, { label: "Building/Block No", name: "building" },
        { label: "Street/Colony Name", name: "street" }, { label: "Area", name: "area" },
        { label: "Landmark", name: "landmark" }, { label: "City", name: "city" },
        { label: "State", name: "state" }, { label: "Pin Code", name: "pinCode" },
      ].map((field) => (
        <div className="mb-3" key={field.name}>
          <label className="form-label">
            {field.label}
            <sup>*</sup>
          </label>
          <input type="text" className="form-control" name={field.name} value={details[field.name] || ""} onChange={handleChange} required />
        </div>
      ))}

      <button type="submit" className="btn btn-primary w-100 py-3" disabled={loading}>
        {loading ? "Submitting..." : "Next"}
      </button>
    </form>
  );
};

export default BusinessDetails;


// const [formData, setFormData] = useState({
//   businessName: "",
//   pinCode: "",
//   building: "",
//   street: "",
//   area: "",
//   landmark: "",
//   city: "",
//   state: "",
//   direction: "",
//   website: "",
// });
