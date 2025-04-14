import React from "react";
import "./heading.css";

const Heading = ({ title, subtitle }) => {
  return (
    <div className="heading-container container">
      <h3 className="heading-title">{title}</h3>
      <p className="heading-subtitle m-0">{subtitle}</p>
    </div>
  );
};

export default Heading;
