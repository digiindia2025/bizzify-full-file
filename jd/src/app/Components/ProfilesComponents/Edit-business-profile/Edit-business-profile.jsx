"use client";
import React, { useState, useEffect } from "react";
import "./EditBusinessProfile.css";
import axios from "axios";
import Image from "next/image";

const categories = [
  { id: "basic", label: "Basic Info", icon: "bi-person" },
  { id: "address", label: "Address", icon: "bi-geo-alt" },
  { id: "subcategory", label: "Category", icon: "bi-grid" },
  { id: "services", label: "Services", icon: "bi-briefcase" },
  { id: "servicearea", label: "Service Area", icon: "bi-map" },
  { id: "url", label: "Business URL", icon: "bi-link-45deg" },
  { id: "img", label: "Business Image", icon: "bi-card-image" },
];

export default function EditBusinessProfile() {
  // ====== Api Data ========
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceInput, setServiceInput] = useState("");
  const [businessArea, setBusinessArea] = useState([]);
  const [areaInput, setAreaInput] = useState("");

  const [formData, setFormData] = useState({
    businessname: "",
    businessCategory: "",
    businessSubCategory: [],
    services: [],
    businessArea: [],
    Building: "",
    Street: "",
    Area: "",
    Landmark: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    about: "",
    image: null,
    images: [],
    email: "",
    experience: "",
    whatsapp: "",

    websiteURL: "",
    googlemap: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
  });

  const apiURL =
    "https://6800a925b72e9cfaf7283453.mockapi.io/businessProfiles/1";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(apiURL);
        const data = response.data;
        setFormData(data);
        setSelectedSubCategories(data.businessSubCategory || []);
        setServices(data.services || []);
        setBusinessArea(data.businessArea || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  // ----- Images ------------

  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else if (name === "images") {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };

  // ===========================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      businessSubCategory: selectedSubCategories, // from badge-based UI
      services: services, // from badge-based UI
      businessArea: businessArea, // from badge-based UI
    };

    try {
      await axios.put(apiURL, updatedData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  const [activeTab, setActiveTab] = useState("basic");

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>Business Name</label>
                  <input
                    type="text"
                    name="businessname"
                    value={formData.businessname}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>Whatsapp No.</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>Years In Business</label>
                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3 mx-3">
              Save Changes
            </button>
            <button
              className="btn btn-outline-secondary mt-3"
              onClick={() => setActiveTab("")}
            >
              Cancel
            </button>{" "}
          </form>
        );

      case "address":
        return (
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="edit-profile-field">
                  <label>Building/Block No</label>
                  <input
                    type="text"
                    name="Building"
                    value={formData.Building}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="edit-profile-field">
                  <label>Street/Colony Name</label>
                  <input
                    type="text"
                    name="Street"
                    value={formData.Street}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="edit-profile-field">
                  <label>Area</label>
                  <input
                    type="text"
                    name="Area"
                    value={formData.Area}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="edit-profile-field">
                  <label>Landmark</label>
                  <input
                    type="text"
                    name="Landmark"
                    value={formData.Landmark}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center">
              <div className="col-md-3">
                <div className="edit-profile-field">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="edit-profile-field">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <div className="edit-profile-field">
                  <label>Pin Code</label>
                  <input
                    type="tel"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3 mx-3">
              Save Changes
            </button>
            <button
              className="btn btn-outline-secondary mt-3"
              onClick={() => setActiveTab("")}
            >
              Cancel
            </button>{" "}
          </form>
        );

      case "url":
        return (
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>Website URL</label>
                  <input
                    type="url"
                    name="websiteURL"
                    value={formData.websiteURL}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>Google Map URL</label>
                  <input
                    type="url"
                    name="googlemap"
                    value={formData.googlemap}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>Facebook</label>
                  <input
                    type="url"
                    name="facebook"
                    onChange={handleChange}
                    value={formData.facebook}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>Instagram</label>
                  <input
                    type="url"
                    name="instagram"
                    onChange={handleChange}
                    value={formData.instagram}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>Twitter</label>
                  <input
                    type="url"
                    name="twitter"
                    onChange={handleChange}
                    value={formData.twitter}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="edit-profile-field">
                  <label>LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    onChange={handleChange}
                    value={formData.linkedin}
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-3 mx-3">
              Save Changes
            </button>
            <button
              className="btn btn-outline-secondary mt-3"
              onClick={() => setActiveTab("")}
            >
              Cancel
            </button>
          </form>
        );

      case "subcategory":
        return (
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="edit-profile-field">
                <label>Business Category</label>
                <input
                  type="text"
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleChange}
                />
              </div>
              <div className="edit-profile-field">
                <label>Add More SubCategory</label>
                <select
                  className="form-control"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value && !selectedSubCategories.includes(value)) {
                      setSelectedSubCategories([
                        ...selectedSubCategories,
                        value,
                      ]);
                    }
                    e.target.value = ""; // Reset select
                  }}
                >
                  <option value="">Add More SubCategory</option>
                  {[
                    "Skin Care",
                    "Hair Treatment",
                    "Nutrition",
                    "Yoga",
                    "Therapy",
                    "Massage",
                    "Consultation",
                  ].map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected badges */}
              <div className="mt-3">
                {selectedSubCategories.map((cat, index) => (
                  <span key={index} className="badge bg-dark me-2 mb-2 p-2">
                    {cat}
                    <button
                      type="button"
                      className="btn-close btn-close-white ms-2"
                      onClick={() =>
                        setSelectedSubCategories(
                          selectedSubCategories.filter((c) => c !== cat)
                        )
                      }
                      aria-label="Remove"
                    />
                  </span>
                ))}
              </div>

              {/* Submit/Cancel */}
            </div>
            <div className="d-flex gap-3 mt-3">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary m-0"
                onClick={() => setActiveTab("")}
              >
                Cancel
              </button>
            </div>
          </form>
        );

      case "services":
        return (
          <form onSubmit={handleSubmit}>
            <div className="row align-items-start">
              <div className="edit-profile-field">
                <label>Add Services</label>
                <input
                  type="text"
                  value={serviceInput}
                  className="form-control"
                  onChange={(e) => setServiceInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && serviceInput.trim()) {
                      e.preventDefault();
                      if (!services.includes(serviceInput.trim())) {
                        setServices([...services, serviceInput.trim()]);
                      }
                      setServiceInput("");
                    }
                  }}
                  placeholder="Type a service and press Enter"
                />

                {/* Render Services as Badges */}
                <div className="mt-3 d-flex flex-wrap">
                  {services.map((srv, index) => (
                    <span key={index} className="badge bg-dark me-2 mb-2 p-2">
                      {srv}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        onClick={() =>
                          setServices(services.filter((s, i) => i !== index))
                        }
                        aria-label="Remove"
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 mt-3">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary m-0"
                onClick={() => setActiveTab("")}
              >
                Cancel
              </button>
            </div>
          </form>
        );

      case "servicearea":
        return (
          <form onSubmit={handleSubmit}>
            <div className="row align-items-center">
              <div className="edit-profile-field">
                <label>Add Service Areas</label>
                <input
                  type="text"
                  value={areaInput}
                  className="form-control"
                  onChange={(e) => setAreaInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && areaInput.trim()) {
                      e.preventDefault();
                      if (!businessArea.includes(areaInput.trim())) {
                        setBusinessArea([...businessArea, areaInput.trim()]);
                        setAreaInput("");
                      }
                    }
                  }}
                  placeholder="Type area name/pin code and press Enter"
                />
                <div className="mt-2">
                  {businessArea.map((area, index) => (
                    <span key={index} className="badge bg-dark me-2 mb-2 p-2">
                      {area}
                      <button
                        type="button"
                        className="btn-close btn-close-white ms-2"
                        onClick={() =>
                          setBusinessArea(
                            businessArea.filter((_, i) => i !== index)
                          )
                        }
                        aria-label="Remove"
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="d-flex gap-3 mt-3">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary m-0"
                onClick={() => setActiveTab("")}
              >
                Cancel
              </button>
            </div>
          </form>
        );

      case "img":
        return (
          <form onSubmit={handleSubmit}>
            <div className="row align-items-start">
              {/* Main Image */}
              <div className="col-md-6">
                <div className="edit-profile-field mb-4">
                  <label>Main Image</label>
                  <div
                    className="border p-2 rounded bg-light position-relative"
                    style={{ minHeight: "180px" }}
                  >
                    <input
                      type="file"
                      name="image"
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    {formData.image && (
                      <div className="mt-3">
                        <img
                          src={
                            typeof formData.image === "string"
                              ? formData.image
                              : formData.image instanceof File
                              ? URL.createObjectURL(formData.image)
                              : ""
                          }
                          alt="Main"
                          className="img-thumbnail"
                          style={{
                            width: "100%",
                            height: "250px",
                            objectFit: "cover",
                            borderRadius: "8px",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Multiple Images */}
              <div className="col-md-6">
                <div className="edit-profile-field mb-4">
                  <label>Upload Multiple Images</label>
                  <div
                    className="border p-2 rounded bg-light"
                    style={{ minHeight: "180px" }}
                  >
                    <input
                      type="file"
                      name="images"
                      multiple
                      className="form-control"
                      onChange={handleFileChange}
                    />
                    <div className="d-flex flex-wrap gap-3 mt-3">
                      {formData.images?.map((img, index) => {
                        const imgUrl =
                          typeof img === "string"
                            ? img
                            : img instanceof File
                            ? URL.createObjectURL(img)
                            : "";

                        return (
                          <div
                            key={index}
                            className="position-relative"
                            style={{ width: "110px", height: "110px" }}
                          >
                            {imgUrl && (
                              <img
                                src={imgUrl}
                                alt={`img-${index}`}
                                className="img-thumbnail"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                }}
                              />
                            )}
                            <button
                              type="button"
                              className="btn-close position-absolute top-0 end-0 bg-light text-dark p-1 rounded-circle"
                              onClick={() => handleRemoveImage(index)}
                              style={{ transform: "scale(0.8)" }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex gap-3 mt-3">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary m-0"
                onClick={() => setActiveTab("")}
              >
                Cancel
              </button>
            </div>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h2 className="edit-profile-title">Edit Business Profile</h2>
      <hr />
      <div className="row text-center">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="col-md-2 col-sm-3 col-6 mb-2"
            onClick={() => setActiveTab(cat.id)}
          >
            <div
              className={`edit-icon-card ${
                activeTab === cat.id ? "active" : ""
              }`}
            >
              <i className={`bi ${cat.icon} fs-4`}></i>
            </div>
            <p className="mt-2">{cat.label}</p>
          </div>
        ))}
      </div>

      <div className="card p-4">{renderTabContent()}</div>
    </div>
  );
}
