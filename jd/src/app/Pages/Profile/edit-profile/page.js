"use client";
import React, { useState } from 'react';
import "./EditProfile.css"; // Ensure you create and import the CSS file

const Page = () => {
    const [formData, setFormData] = useState({
        id: 1,
        businessname: "Pasricha Clinic",
        businessCategory: "Web Developer",
        city: "Delhi",
        state: "Delhi",
        address: "Shop 20, C S C II, Sector XIII, Rohini, Delhi",
        phone: "+91 9810000000",
        about: "Very polite and extremely knowledgeable doctor.",
        image: "",
        images: [], // Multiple images
        email: "gouravpanchal80107@gmail.com",
        experience: "5 years",
        services: "General Check-up",
        whatsapp:"+91 9810000000",
        pincode:"110085",
        websiteURL: "https:digiindiasolutions.com",
        googlemap: "google-map-url"
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Data:", formData);
    };

    return (
        <div className="edit-profile-container">
            <div className="edit-profile-card">
                <h2 className="edit-profile-title">Edit Your Business Profile-</h2>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className='row align-items-center'>
                        <div className='heading'>
                            <h5>Contact Information :-</h5>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Business Name</label>
                                <input type="text" name="businessname" value={formData.businessname} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Business Category</label>
                                <input type="text" name="businessCategory" value={formData.businessCategory} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Main Image</label>
                                <input type="file" name="image" onChange={handleFileChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Upload Multiple Images</label>
                                <input type="file" name="images" multiple onChange={handleFileChange} />
                            </div>
                        </div>
                        <hr />
                        <div className='heading'>
                            <h5>Business Address :-</h5>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Address</label>
                                <input type="text" name="address" value={formData.address} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>State</label>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Pin Code</label>
                                <input type="tel" name="pincode" value={formData.pincode} onChange={handleChange} />
                            </div>
                        </div>
                        <hr />
                        <div className='heading'>
                            <h5>Business Detail :-</h5>
                        </div>
                        
                        <div className='col-md-12'>
                            <div className="edit-profile-field">
                                <label>About</label>
                                <textarea name="about" rows={3} value={formData.about} onChange={handleChange}></textarea>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Phone</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>whatsapp No.</label>
                                <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Years In Business</label>
                                <input type="text" name="experience" value={formData.experience} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Services</label>
                                <input type="text" name="services" value={formData.services} onChange={handleChange} />
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Website URL</label>
                                <input type='url' name="about" value={formData.websiteURL} onChange={handleChange}/>
                            </div>
                        </div>
                        <div className='col-md-3'>
                            <div className="edit-profile-field">
                                <label>Google Map URL</label>
                                <input type="url" name="googlemap" value={formData.googlemap} onChange={handleChange} />
                            </div>
                        </div>
                       
                        <div className='col-md-12 d-flex justify-content-center'>
                            <button type="submit" className="black-btn">Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;