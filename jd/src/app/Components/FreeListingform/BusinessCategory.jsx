// Frontend (Next.js or React - assuming this is a client component)
"use client";
import React, { useState, useEffect } from "react";
import "../../Pages/freelistingform/freelistingform.css";

const BusinessCategory = ({ setKey }) => {
  const [category, setCategory] = useState([]); // Subcategory IDs
  const [services, setServices] = useState(""); // Static category value
  const [about, setAbout] = useState("");
  const [businessImages, setBusinessImages] = useState([]); // Images selected by user
  const [subcategories, setSubcategories] = useState([]);
  const [fetchSubcategoriesError, setFetchSubcategoriesError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  // Fetch subcategories
  useEffect(() => {
    fetch("http://localhost:5000/api/admin/subcategories")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setSubcategories(data))
      .catch((err) => {
        console.error("Error fetching subcategories:", err);
        setFetchSubcategoriesError("Failed to load subcategories.");
      });
  }, []);

  // Handle category selection change
  const handleSelectChange = (e) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategory((prev) => [...new Set([...prev, ...selectedValues])]);
  };

  // Remove selected category
  const removeCategory = (idToRemove) => {
    setCategory(category.filter((id) => id !== idToRemove));
  };

  // Handle image change (upload)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setBusinessImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  // Remove image preview
  const removeImage = (index) => {
    setBusinessImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Get subcategory name by ID
  const getSubcategoryName = (id) => {
    const match = subcategories.find((sub) => sub._id === id);
    return match ? match.name : id;
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    // Ensure all required fields are provided
    if (!services || category.length === 0 || !about) {
      alert("Please select a category, at least one subcategory, and provide a description.");
      return;
    }

    const formData = new FormData();
    formData.append("category", services);
    formData.append("about", about);

    // Append selected subcategories to form data
    category.forEach((subCatId) => formData.append("subcategories[]", subCatId));

    // Append selected images to form data
    const fileInputs = document.querySelector('input[type="file"]');
    const files = fileInputs?.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      // Send POST request to create a business listing
      const response = await fetch("http://localhost:5000/api/admin/business-listing", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      // Check if the response is successful
      if (response.ok) {
        console.log("Listing created:", result);
        setKey("timing"); // Move to next step
      } else {
        // Ensure result is not undefined and contains an error message
        const errorMessage = result?.error || "Error submitting form";
        console.error("Failed to create listing. Response:", result);
        setSubmitError(errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      // Catch unexpected errors and log them
      console.error("Error:", error);
      setSubmitError("Something went wrong! Please try again.");
      alert("Something went wrong! Please try again.");
    }
  };

  if (fetchSubcategoriesError) {
    return <div>Error: {fetchSubcategoriesError}</div>;
  }

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
          <option value="health">Health & Wellness</option>
          <option value="education">Education</option>
          <option value="food">Food & Beverages</option>
          <option value="automobile">Automobile</option>
          <option value="fashion">Fashion & Lifestyle</option>
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
          <option value="" disabled>Select Your SubCategory</option>
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

      {submitError && <div className="alert alert-danger">{submitError}</div>}

      <button type="submit" className="btn btn-primary w-100 py-3">
        Next
      </button>
    </form>
  );
};

export default BusinessCategory;  