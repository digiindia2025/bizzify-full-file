"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./enquiryform.css";
import "../../Pages/contact-us/contactus.css";

const Enquiryform = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const isSubmitted = localStorage.getItem("contactFormSubmitted");
    const lastClosed = localStorage.getItem("contactFormClosed");
    let attemptCount = parseInt(localStorage.getItem("formAttemptCount")) || 0;

    if (!isSubmitted) {
      let delay;

      // Delay logic based on attempts
      if (attemptCount === 0) delay = 5000; // First attempt: 5s
      else if (attemptCount === 1) delay = 15000; // Second attempt: 15s
      else delay = 30000; // Third attempt onwards: 30s

      // Ensure correct delay if user has closed the form before
      if (!lastClosed || Date.now() - lastClosed > delay) {
        const timer = setTimeout(() => setShow(true), delay);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("contactFormSubmitted", "true");
    setShow(false);
    alert("Thank you for contacting us!");
  };

  const handleClose = () => {
    let attemptCount = parseInt(localStorage.getItem("formAttemptCount")) || 0;
    localStorage.setItem("contactFormClosed", Date.now());
    localStorage.setItem("formAttemptCount", attemptCount + 1); // Increase attempt count
    setShow(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : -50 }}
        transition={{ duration: 0.5 }}
        className={`modal fade ${show ? "show d-block" : ""}`}
        tabIndex="-1"
        style={{ backgroundColor: show ? "rgba(0,0,0,0.5)" : "transparent" }}
      >
        <div className="modal-dialog">
          <div className="modal-content costom-modal-content">
            <div className="modal-header">
              <div>
                <h5 className="modal-title">Enquiry Form</h5>
                <p className="m-0">
                  Fill this form and get a chance to increase your business.
                </p>
              </div>
              <button
                type="button"
                className="btn-close-modal"
                onClick={handleClose}
              >
                <i className="bi bi-x-octagon"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-input"
                    rows="4"
                    placeholder="Write your message"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Enquiryform;
