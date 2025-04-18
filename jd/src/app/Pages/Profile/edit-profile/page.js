"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditProfile.css";

const Page = () => {
  const [formData, setFormData] = useState({
    businessname: "",
    businessCategory: "",
    businessSubCategory: "",
    services: "",
    businessArea: "",
    city: "",
    state: "",
    address: "",
    phone: "",
    about: "",
    image: null,
    images: [],
    email: "",
    experience: "",
    whatsapp: "",
    pincode: "",
    websiteURL: "",
    googlemap: "",
  });

  const apiURL =
    "https://6800a925b72e9cfaf7283453.mockapi.io/businessProfiles/1";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(apiURL);
        const data = response.data;

        setFormData({
          ...data,
          businessSubCategory: data.businessSubCategory?.join(", ") || "",
          services: data.services?.join(", ") || "",
          businessArea: data.businessArea?.join(", ") || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else if (name === "images") {
      setFormData({ ...formData, images: [...e.target.files] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      businessSubCategory: formData.businessSubCategory
        .split(",")
        .map((s) => s.trim()),
      services: formData.services.split(",").map((s) => s.trim()),
      businessArea: formData.businessArea.split(",").map((s) => s.trim()),
    };

    try {
      await axios.put(apiURL, updatedData);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <h2 className="edit-profile-title">Edit Your Business Profile-</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="row align-items-center">
            <div className="heading">
              <h5>Business Information :-</h5>
            </div>
            <div className="col-md-3">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
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
            <div className="col-md-3">
              <div className="edit-profile-field">
                <label>Business Category</label>
                <input
                  type="text"
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="edit-profile-field">
                <label>Business SubCategory</label>
                <input
                  type="text"
                  name="businessSubCategory"
                  value={formData.businessSubCategory}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="edit-profile-field">
                <label>Business Services</label>
                <input
                  type="text"
                  name="services"
                  value={formData.services}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="edit-profile-field">
                <label>Business Area</label>
                <input
                  type="text"
                  name="businessArea"
                  value={formData.businessArea}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-3">
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

            <hr />
            <div className="heading">
              <h5>Business Address :-</h5>
            </div>
            <div className="col-md-3">
              <div className="edit-profile-field">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
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
            <hr />
            <div className="heading">
              <h5>More About Business :-</h5>
            </div>
            <div className="col-md-12">
              <div className="edit-profile-field">
                <label>About</label>
                <textarea
                  name="about"
                  rows={3}
                  value={formData.about}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

            <div className="col-md-3">
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
            <div className="col-md-3">
              <div className="edit-profile-field">
                <label>Main Image</label>
                <input type="file" name="image" onChange={handleFileChange} />
              </div>
            </div>
            <div className="col-md-3">
              <div className="edit-profile-field">
                <label>Upload Multiple Images</label>
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="col-md-3">
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
            <div className="col-md-3">
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

            <div className="col-md-12 d-flex justify-content-center">
              <button type="submit" className="black-btn">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;