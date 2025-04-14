"use client";
import React, { useState } from "react";
import "../../Pages/freelistingform/freelistingform.css";

const BusinessCategory = ({ setKey }) => {
  const [category, setCategory] = useState([]); // subcategories
  const [services, setServices] = useState(""); // main category
  const [about, setAbout] = useState("");
  const [businessImages, setBusinessImages] = useState([]);

  const handleSelectChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategory((prevCategories) => [
      ...new Set([...prevCategories, ...selectedValues]),
    ]);
  };

  const removeCategory = (categoryToRemove) => {
    setCategory(category.filter((cat) => cat !== categoryToRemove));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setBusinessImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const removeImage = (index) => {
    setBusinessImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!services || !category.length || !about) {
      alert("All required fields must be provided.");
      return;
    }

    const formData = new FormData();
    formData.append("category", services);
    formData.append("about", about);

    // Adding selected subcategories to the form data
    category.forEach((subCat) => formData.append("subcategories[]", subCat));

    // Adding images to the form data
    const fileInputs = document.querySelector('input[type="file"]');
    const files = fileInputs?.files;

    if (files) {
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/business-listing", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Listing created:", result);
        setKey("timing");
      } else {
        console.error("Failed to create listing:", result);
        alert("Error submitting form");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h5 className="section-title">
        Select Business Category<sup>*</sup>
      </h5>

      <div className="mb-3">
        <label className="form-label">
          Select Business Category <sup>*</sup>
        </label>
        <select
          className="form-control"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          required
        >
          <option value="">Select Your Category</option>
          <option value="Construction">Construction</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Education">Education</option>
          <option value="Retail">Retail</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Automotive">Automotive</option>
          <option value="Manufacturing">Manufacturing</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">
          Select Business SubCategory <sup>*</sup>
        </label>
        <select
          className="form-control"
          required
          onChange={handleSelectChange}
          multiple
        >
          <option value="">Select Your SubCategory</option>
          <option value="Construction">Construction</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Education">Education</option>
          <option value="Retail">Retail</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Hospitality">Hospitality</option>
          <option value="Automotive">Automotive</option>
          <option value="Manufacturing">Manufacturing</option>
        </select>
        <div className="mt-2">
          {category.map((cat) => (
            <span key={cat} className="badge bg-primary m-1 p-2">
              {cat}
              <button
                type="button"
                className="btn-close ms-2 bg-danger"
                onClick={() => removeCategory(cat)}
                aria-label="Remove"
              ></button>
            </span>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label">
          About Your Business <sup>*</sup>
        </label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Write about your business..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">
          Upload Business Photos{" "}
          <span style={{ color: "red" }}>(Optional)</span>
        </label>
        <input
          type="file"
          className="form-control"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="image-preview-container mt-2">
          {businessImages.map((img, index) => (
            <div
              key={index}
              className="image-preview d-inline-block position-relative me-2"
            >
              <img
                src={img}
                alt={`Preview ${index}`}
                className="img-thumbnail"
              />
              <button
                type="button"
                className="btn-close position-absolute top-0 start-100 translate-middle bg-danger"
                onClick={() => removeImage(index)}
                aria-label="Remove"
              ></button>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100 py-3">
        {" "}
        Next
      </button>
    </form>
  );
};

export default BusinessCategory;
