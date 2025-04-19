"use client";

import React, { useState, useRef } from "react";
import "./Support.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const supportTypes = [
  {
    id: 1,
    title: "Business Listing Issue",
    description: "Problems with your business listing",
    icon: "bi-building",
  },
  {
    id: 2,
    title: "Profile Issue",
    description: "Trouble updating or viewing your profile",
    icon: "bi-person-circle",
  },
  {
    id: 3,
    title: "Payment Help",
    description: "Billing or payment related questions",
    icon: "bi-credit-card",
  },
  {
    id: 4,
    title: "Plan Help",
    description: "Support regarding plan upgrades or downgrades",
    icon: "bi-box",
  },
  {
    id: 5,
    title: "General Inquiry",
    description: "Other questions or feedback",
    icon: "bi-question-circle",
  },
];

export default function SupportCenter() {
  const [selectedType, setSelectedType] = useState(null);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const formRef = useRef(null);

  const handleCardClick = (type) => {
    setSelectedType(type);

    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if email or description is empty
    if (!email || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = {
      email,
      description,
      supportType: selectedType?.title,
    };

    // Log the form data to the console (for testing purposes)
    console.log("Form Data Submitted:", formData);

    // Show success toast notification with position specified as string
    toast.success(
      <div>
        <p>
          Ticket submitted for {selectedType?.title || "your support request"}
        </p>
      </div>,
      { position: "top-center" }
    );

    // Reset the form fields
    setEmail("");
    setDescription("");
    setSelectedType(null);
  };

  return (
    <div className="container">
      <div>
        <h2 className="edit-profile-title">Support Center</h2>
        <p className="text-muted">
          Select the type of support you need, and our team will assist you.
        </p>
      </div>

      <hr />

      <div className="row g-3 mb-5">
        {supportTypes.map((type) => (
          <div className="col-md-4 col-sm-6" key={type.id}>
            <div
              className="support-card h-100 p-3 text-center"
              onClick={() => handleCardClick(type)}
            >
              <div className="icon-box mb-2 mx-auto">
                <i className={`bi ${type.icon} fs-5`}></i>
              </div>
              <h5>{type.title}</h5>
              <p className="small">{type.description}</p>
              <button className="btn btn-outline-primary btn-sm mt-1">
                Generate Ticket
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedType && (
        <div className="card p-4" ref={formRef}>
          <div className="d-flex align-items-center mb-4">
            <i className={`bi ${selectedType.icon} fs-4 text-primary me-3`}></i>
            <h4 className="mb-0">Submit a Ticket for {selectedType.title}</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                <i className="bi bi-envelope me-2"></i>Your Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <i className="bi bi-chat-left-text me-2"></i>Describe Your Issue
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="5"
                required
                placeholder="Please provide details about your issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-send me-2"></i>Submit Ticket
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setSelectedType(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toast Notifications Container */}
      <ToastContainer />
    </div>
  );
}
