import React from "react";
import "./SuccessPage.css";
import Link from "next/link";
const page = () => {
  return (
    <div className="container my-5 p-4">
      {/* Success Message */}
      <div
        className="alert alert-success successlisting-alert-success"
        role="alert"
      >
        <i className="bi bi-patch-check-fill me-2" size={24}></i>
        <strong>
          Congratulations - Your business is now registered with Biziffy
        </strong>
      </div>

      {/* Premium Plan Section */}
      <div className="premium-plan">
        <h4 className="d-flex align-items-center fw-bold">
          <i class="bi bi-star-fill text-warning me-2"></i>
          Upgrade to Premium Listing Plan
        </h4>
        <p>
          Rank higher on search results and get more customers to contact you.
        </p>

        {/* Features List */}
        <div className="row mt-3">
          <div className="col-md-6">
            <ul>
              <li className="mb-2">Rank Higher than Free Listing</li>
              <li className="mb-2">Business Leads</li>
              <li className="mb-2">Payment Solutions</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul>
              <li className="mb-2">Verified and Trusted Seal</li>
              <li className="mb-2">Digital Catalogue</li>
              <li className="mb-2">Own Business Website</li>
            </ul>
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-4">
          <Link href="/Pages/free-listing#paidlisting">
            <button className="btn btn-primary px-4 py-2">
              Get Premium Plan (Grow your Business)
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
