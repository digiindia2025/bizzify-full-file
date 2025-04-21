"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tabs, Tab, Form } from "react-bootstrap";
import "./freelistingform.css";
import Image from "next/image";
import BusinessDetails from "@/app/Components/FreeListingform/BusinessDetails";
import ContactPerson from "@/app/Components/FreeListingform/ContactPerson";
import BusinessTiming from "@/app/Components/FreeListingform/BusinessTiming";
import BusinessCategory from "@/app/Components/FreeListingform/BusinessCategory";
import UpgradeListing from "@/app/Components/FreeListingform/UpgradeListing";
import contactImage from "../../Images/Step1.png";
import businessImage from "../../Images/Step2.png";
import categoryImage from "../../Images/Step3.png";
import timingImage from "../../Images/Step3.png";
import upgradeImage from "../../Images/Step4.png";
import Head from "next/head";
import axios from "axios";

const Page = () => {
  const [key, setKey] = useState("contact");
  const [formData, setFormData] = useState({});

  const tabImages = { contact: contactImage, business: businessImage, category: categoryImage, timing: timingImage, upgrade: upgradeImage, };

  console.log("FORMDATA:-", formData);
  const handleListingSubmit = async () => {
    const form = new FormData();
    form.append("contactPerson", JSON.stringify(formData.contactPerson));
    form.append("businessDetails", JSON.stringify(formData.businessDetails));
    form.append("businessTiming", JSON.stringify(formData.timings));
    form.append("businessCategory", JSON.stringify(formData.businessCategory));
    form.append("upgradeListing", JSON.stringify(formData.upgradeListing));
    form.append("businessImages", formData.businessCategory.businessImages);

    try {
      const response = await axios.post("http://localhost:5000/api/createBusinessListing", form);

      if (response.status) {
        // const data = await response.json();
        console.log("Success:", response.data);
        // Handle success (e.g., show success message or redirect)
      } else {
        const error = await response.json();
        console.log("Error:", error.message);
        // Handle error
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Head>
        <title>Free Business Listing | List Your Businesses on Biziffy</title>
        <meta
          name="description"
          content="List your business for free on Biziffy and reach thousands of customers. Submit your company details, contact info, category, and go live today!"
        />
        <meta
          name="keywords"
          content="free business listing, list my business, online business directory, submit business form, business listing India, local business promotion, contact info form, free local listing, company registration online, promote my business, free business form, Biziffy listing form, digital listing, get listed for free, business leads, grow online, SEO for local business, free SME registration, list startup, MSME online visibility"
        />

        {/* Open Graph for social media */}
        <meta
          property="og:title"
          content="Free Business Listing | Submit Your Business on Biziffy"
        />
        <meta
          property="og:description"
          content="Submit your business details for free. Reach more customers through Biziffy’s high-performing local directory."
        />
        <meta property="og:url" content="https://biziffy.com/free-listing" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Biziffy" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Free Business Listing | List Your Company on Biziffy"
        />
        <meta
          name="twitter:description"
          content="Fill out the free listing form and start getting leads from your local area. No payment required!"
        />
        <meta name="twitter:creator" content="@biziffy" />
      </Head>

      <section className="freelistingform-page-css">
        <div className="container">
          <div className="row">
            {/* Fixed Image Section */}
            <div className="col-md-6 d-flex justify-content-center align-items-center">
              <Image
                src={tabImages[key]}
                alt="Tab Illustration"
                className="tab-image"
              />
            </div>

            {/* Form Section */}
            <div className="col-md-6">
              <h4 className="tab-form-title">Please Fill Your Details</h4>
              <div className="free-listing-multitab">
                <Tabs activeKey={key} className="border-0">
                  <Tab eventKey="contact" className="tab-stlye">
                    <ContactPerson setKey={setKey} formData={formData} setFormData={setFormData} />
                  </Tab>
                  <Tab eventKey="business" className="tab-stlye">
                    <BusinessDetails setKey={setKey} formData={formData} setFormData={setFormData} />
                  </Tab>

                  <Tab eventKey="category" className="tab-stlye">
                    <BusinessCategory setKey={setKey} formData={formData} setFormData={setFormData} />
                  </Tab>
                  <Tab eventKey="timing" className="tab-stlye">
                    <BusinessTiming setKey={setKey} formData={formData} setFormData={setFormData} />
                  </Tab>
                  <Tab eventKey="upgrade" className="tab-stlye">
                    <UpgradeListing setKey={setKey} handleListingSubmit={handleListingSubmit} formData={formData} setFormData={setFormData} />
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
