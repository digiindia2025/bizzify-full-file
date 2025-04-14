"use client";
import React from "react";
import "./BulkSms.css";
import Image from "next/image";
import curvedDottedLine from "../../Images/aboutbgImage.png";

const BulkSms = () => {
  const steps = [
    {
      step: "1",
      title: "Increased Online Presence",
      subtitle:
        "Get listed on multiple high-traffic directories and platforms.",
    },
    {
      step: "2",
      title: "Boost SEO Rankings",
      subtitle: "Improve your search engine visibility and website traffic.",
    },
    {
      step: "3",
      title: "Better Customer Engagement",
      subtitle:
        "Attract more leads with accurate and consistent business information.",
    },
    {
      step: "4",
      title: "Enhanced Credibility",
      subtitle: "Establish trust with potential clients and customers.",
    },
  ];

  return (
    <section>
      <div className="container text-center">
        <div className="position-relative mt-3">
          {/* Dotted Line Image */}
          <div className="position-absolute top-50 start-50 translate-middle d-none d-md-block">
            <Image src={curvedDottedLine} alt="Curved Dotted Line" />
          </div>

          <div className="row justify-content-center">
            {steps.map((item, index) => (
              <div key={index} className="col-md-3 text-center mb-4">
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle shadow-sm mx-auto businessListingBenefitsStep step-${
                    index + 1
                  }`}
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "2px solid #ccc",
                  }}
                >
                  <span className="fw-bold fs-4 text-white">{item.step}</span>
                </div>
                <h5 className="mt-3 text-dark">{item.title}</h5>
                <p className="text-muted">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BulkSms;
