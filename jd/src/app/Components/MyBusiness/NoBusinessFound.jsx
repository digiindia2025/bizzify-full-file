import React from "react";
import Image from "next/image"; 
import NoBusinessFoundImage from "../../Images/NoBusinessFound.jpg"; 
import Link from "next/link";
const NoBusinessFound = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="row justify-content-center w-100 text-center">
        <div className="col-md-6 mb-4">
          <Image
            src={NoBusinessFoundImage}
            alt="No Business Found"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h3 className="fw-bold text-danger">
            Oops! You haven't listed your business yet.
          </h3>
          <p className="text-muted mb-4">
            Please list your business with Biziffy to get started.
          </p>
          <Link href="/Pages/freelistingform">

          <button className="btn btn-primary btn-lg">List Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoBusinessFound;
