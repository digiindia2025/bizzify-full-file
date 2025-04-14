import React from "react";
import Image from "next/image";
import curvedDottedLine from "../../Images/aboutbgImage.png";

const RoadMap = () => {
  return (
    <section>
      <div className="container text-center">
        <div className="position-relative mt-5">
          {/* Dotted Line Image */}
          <div className="position-absolute top-0 start-50 translate-middle-x d-none d-md-block">
            <Image src={curvedDottedLine} alt="Curved Dotted Line" />
          </div>

          <div className="row justify-content-center">
            {[
              {
                step: "1",
                title: "Submit Your Business Details ",
                subtitle:
                  "Provide us with your business name, contact details, and other relevant information.",
              },
              {
                step: "2",
                title: "We Process the Listings ",
                subtitle:
                  "Our team will publish your business information on multiple pages of Biziffy.com.",
              },
              {
                step: "3",
                title: "Review & Optimization ",
                subtitle:
                  "We ensure all details are accurate and optimized for better visibility.",
              },
              {
                step: "4",
                title: "Track Your Performance ",
                subtitle:
                  "Receive periodic reports on your business performance across Biziffy.com",
              },
            ].map((item, index) => (
              <div key={index} className="col-md-3 text-center mb-4">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle border border-secondary shadow-sm mx-auto"
                  style={{ width: "40px", height: "40px" }}
                >
                  <span className="fw-bold fs-5 text-secondary">
                    {item.step}
                  </span>
                </div>
                <h3 className="mt-4 fw-semibold">{item.title}</h3>
                <p className="text-muted">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadMap;
