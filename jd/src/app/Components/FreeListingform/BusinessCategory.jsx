"use client";
import React, { useState, useEffect } from "react";
import "../../Pages/freelistingform/freelistingform.css";

const BusinessCategory = ({ setKey }) => {
  const [category, setCategory] = useState([]); // Subcategory IDs
  const [services, setServices] = useState(""); // Main category ID
  const [about, setAbout] = useState("");
  const [businessImages, setBusinessImages] = useState([]);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Fetch categories and subcategories
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/categories")
    .then((res) => res.json())
    .then((data) => setCategories(data));
  

    fetch("http://localhost:5000/api/admin/subcategories")
      .then((res) => res.json())
      .then((data) => setSubcategories(data));
  }, []);

  const handleSelectChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategory((prev) => [...new Set([...prev, ...selectedValues])]);
  };

  const removeCategory = (idToRemove) => {
    setCategory(category.filter((id) => id !== idToRemove));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setBusinessImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const removeImage = (index) => {
    setBusinessImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const getSubcategoryName = (id) => {
    const match = subcategories.find((sub) => sub._id === id);
    return match ? match.name : id;
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

    category.forEach((subCatId) => formData.append("subcategories[]", subCatId));

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
        setKey("timing"); // Go to next step
      } else {
        console.error("Failed to create listing:", result);
        alert(result.error || "Error submitting form");
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
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
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
          {subcategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        <div className="mt-2">
          {category.map((catId) => (
            <span key={catId} className="badge bg-primary m-1 p-2">
              {getSubcategoryName(catId)}
              <button
                type="button"
                className="btn-close ms-2 bg-danger"
                onClick={() => removeCategory(catId)}
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
          Upload Business Photos <span style={{ color: "red" }}>(Optional)</span>
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
        Next
      </button>
    </form>
  );
};

export default BusinessCategory;
