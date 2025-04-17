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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setKey("category");
  };



  const handleBusinessDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/business/details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Success:", result);
      } else {
        const error = await response.json();
        console.log("Error:", error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="section-title">
        Fill Business Details<sup>*</sup>
      </h5>

      <div className="mb-3">
        <label className="form-label">
          Business Name<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="businessName"
          onChange={handleChange}
          // required
        />
      </div>
     
      <div className="mb-3">
        <label className="form-label">
          Building/Block No<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="building"
          onChange={handleChange}
          // required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Street/Colony Name<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="street"
          onChange={handleChange}
          // required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Area<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="area"
          onChange={handleChange}
          // required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Landmark<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="landmark"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          City<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="city"
          onChange={handleChange}
          // required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          State<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="state"
          onChange={handleChange}
          // required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Pin Code<sup>*</sup>
        </label>
        <input
          type="text"
          className="form-control"
          name="pinCode"
          onChange={handleChange}
          // required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100 py-3">
        Next
      </button>
    </form>
  );
};

export default BusinessDetails;