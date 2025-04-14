"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CoprateAdvertise.css";
import Link from "next/link";
import Automobile from "../../Images/Automobile.jpg";
import Education from "../../Images/Education.jpg";
import Healthcare from "../../Images/Healthcare.jpg";
import Retail from "../../Images/LocalShops.webp";
import Estate from "../../Images/RealEstate.jpg";
import { motion } from "framer-motion";
import Head from "next/head";

import HomeServices from "../../Images/HomeServices.png";
import coprateAdvertise from "../../Images/CoprateAdversite.jpg";
import wideaudince from "../../Images/WideReach.jpg";
import costeffective from "../../Images/CostEffective.jpg";
import customize from "../../Images/CustomizePlanes.jpg";
import target from "../../Images/TargetAduince.jpg";
import moveintime from "../../Images/MoveInTime.jpg";
import RoadMap from "@/app/Components/RoadMap/RoadMap";
import BulkSms from "@/app/Components/BulkBusinessListingBenefits/BusinessListingBenefits";

function Page() {
  // =========================================

  const features = [
    {
      id: 1,
      title: "Wider Audience Reach",
      image: wideaudince,
      points: [
        {
          icon: "bi-graph-up-arrow",
          title: "Expand Your Visibility",
          text: "Showcase your brand across multiple Biziffy pages.",
        },
        {
          icon: "bi-people",
          title: "Reach More Customers",
          text: "Get noticed by a larger audience on Biziffy.",
        },
        {
          icon: "bi-megaphone",
          title: "Boost Your Brand",
          text: "Feature your business on high-traffic Biziffy pages.",
        },
        {
          icon: "bi-eye",
          title: "Maximize Exposure",
          text: "Promote your brand on Biziffy diverse platform.",
        },
      ],
    },
    {
      id: 2,
      title: "Cost-Effective Solutions",
      image: costeffective,
      points: [
        {
          icon: "bi-cash-stack",
          title: "Budget-Friendly Promotion",
          text: "Market your business without breaking the bank.",
        },
        {
          icon: "bi-graph-up",
          title: "High ROI Advertising",
          text: "Maximize your reach while keeping costs low.",
        },
        {
          icon: "bi-megaphone",
          title: "Cost-Effective Marketing",
          text: "Affordable solutions tailored to your business needs.",
        },
        {
          icon: "bi-globe2",
          title: "Wide Visibility & Low Cost",
          text: "Expand your audience without overspending.",
        },
      ],
    },
    {
      id: 3,
      title: "Customizable Packages",
      image: customize,
      points: [
        {
          icon: "bi-sliders",
          title: "Flexible Plans",
          text: "Choose a package that fits your budget and goals.",
        },
        {
          icon: "bi-gear-wide-connected",
          title: "Tailored Solutions",
          text: "Customize your listing based on your business needs.",
        },
        {
          icon: "bi-briefcase",
          title: "Business-Friendly Options",
          text: "Get a package designed to enhance your brand visibility.",
        },
        {
          icon: "bi-stars",
          title: "Premium & Standard Plans",
          text: "Select from various plans to suit your advertising goals.",
        },
      ],
    },
    {
      id: 4,
      title: "Targeted Marketing",
      image: target,
      points: [
        {
          icon: "bi-geo-alt",
          title: "Location-Based Reach",
          text: "Connect with customers in specific regions or cities.",
        },
        {
          icon: "bi-people",
          title: "Interest-Based Targeting",
          text: "Engage audiences who are interested in your products or services.",
        },
        {
          icon: "bi-bar-chart",
          title: "Demographic Focus",
          text: "Promote your business to the right age, gender, and audience groups.",
        },
        {
          icon: "bi-bullseye",
          title: "Smart Advertising",
          text: "Use data-driven strategies to attract potential customers.",
        },
      ],
    },
    {
      id: 5,
      title: "Fast & Efficient Services",
      image: moveintime,
      points: [
        {
          icon: "bi-lightning",
          title: "Quick Turnaround",
          text: "Get your campaigns live in no time with our fast process.",
        },
        {
          icon: "bi-gear",
          title: "Streamlined Execution",
          text: "Effortless setup and smooth handling of your advertising needs.",
        },
        {
          icon: "bi-clock",
          title: "Time-Saving Solutions",
          text: "We handle everything efficiently, so you can focus on business growth.",
        },
        {
          icon: "bi-rocket",
          title: "Instant Visibility",
          text: "Boost your brand's exposure quickly with our optimized services.",
        },
      ],
    },
  ];

  // =======================================
  const cards = [
    { id: 1, title: "Automobile ", image: Automobile, link: "/Automobile" },
    { id: 2, title: "Education ", image: Education, link: "/Education" },
    { id: 3, title: "Healthcare ", image: Healthcare, link: "/Healthcare" },
    { id: 4, title: "Retail & Local Shops", image: Retail, link: "/Retail" },
    { id: 5, title: "Real Estate ", image: Estate, link: "/Estate" },
    {
      id: 6,
      title: "coprate Services",
      image: HomeServices,
      link: "/HomeServices",
    },
  ];

  const [showForm, setShowForm] = useState(false);

  const handleFormToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Head>
        <title>
          Corporate Advertising | Premium Plans & Free Business Listing -
          Biziffy
        </title>
        <meta
          name="description"
          content="Promote your business with Biziffy’s premium membership plans or get started with our free business listing. Reach local customers and grow digitally with corporate advertising options."
        />
        <meta
          name="keywords"
          content="corporate advertising, advertise with Biziffy, business listing plans, premium membership, free business listing, business promotion plans, local business marketing, small business ads, online business listing, advertise business online, Biziffy plans, grow your business, digital promotion, business directory listing, paid business listing, affordable advertising, business exposure, premium leads, featured listing, verified listing Biziffy, business visibility online, business plans India, marketing membership, corporate branding, Biziffy advertising services"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Advertise with Biziffy | Premium Plans & Business Listing"
        />
        <meta
          property="og:description"
          content="Boost your online visibility with Biziffy’s premium advertising options. Choose free or paid plans to grow your local business digitally."
        />
        <meta
          property="og:url"
          content="https://biziffy.com/corporate-advertise"
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Biziffy" />

        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Corporate Advertising | Biziffy Premium Plans"
        />
        <meta
          name="twitter:description"
          content="Get listed and advertise with Biziffy. Choose from premium membership or free business listing to expand your business reach."
        />
        <meta name="twitter:creator" content="@biziffy" />
      </Head>

      <section className="some-page-hero-bg">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="some-page-hero-content">
                <motion.h1
                  className="some-page-hero-title"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  Are you{" "}
                  <span style={{ color: "var(--blue)" }}>
                    looking to expand
                  </span>{" "}
                  business reach ?
                </motion.h1>
                <motion.p
                  className="some-page-hero-subtitle"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                >
                  <b>
                    Bizi<span style={{ color: "var(--blue)" }}>ff</span>y
                  </b>{" "}
                  offers Bulk Advertisement & Business Listing services.{" "}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="biziffy-coprate-image-div">
                <Image
                  src={coprateAdvertise}
                  alt="Biziffy coprate us"
                  className="biziffy-coprate-image"
                />
              </div>
            </div>
            <div className="col-md-7">
              <div className="biziffy-coprate-content">
                <h1 className="biziffy-coprate-title">
                  We are a Bizi<span style={{ color: "var(--blue)" }}>ff</span>y
                  that offers Bulk Business Listing & Bulk Advertising Benefits.
                </h1>
                <motion.p
                  className="biziffy-coprate-text"
                  initial={{ opacity: 0, x: -50 }} // Slide in from the left
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  Looking for a way to grow your business and attract more
                  customers? Biziffy provides Bulk Advertisement & Business
                  Listing services that help you reach a wider audience&lsquo;
                  improve visibility&lsquo; and establish credibility in your
                  industry. Whether you&apos;re a startup or an established
                  business&lsquo; our platform ensures that your brand gets the
                  recognition it deserves.
                </motion.p>
                <motion.p
                  className="biziffy-coprate-text"
                  initial={{ opacity: 0, y: 50 }} // Slide in from the right
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} // Delay to make it smoother
                  viewport={{ once: true, amount: 0.2 }}
                >
                  In a competitive market&lsquo; having a strong online presence
                  is key to success. Biziffy&apos;s Bulk Business Listing
                  services allow you to feature your business on multiple
                  high-traffic directories&lsquo; search engines&lsquo; and
                  listing platforms. This ensures that potential customers can
                  easily find you when searching for relevant services. With
                  consistent and accurate business information&lsquo; your brand
                  becomes more discoverable&lsquo; leading to increased
                  inquiries and higher conversion rates.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="coprate-page-count-content">
                <h1 className="coprate-page-count-title">
                  Why Choose Bizi
                  <span style={{ color: "var(--blue)" }}>ff</span>y.com for Bulk
                  Advertising?
                </h1>
              </div>
              {features.map((feature, index) => (
                <motion.div
                  className="row coprate-why-choose-us-data"
                  key={feature.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <div
                    className={`col-md-4 ${
                      index % 2 === 0
                        ? "order-md-1 order-1"
                        : "order-md-2 order-1"
                    }`}
                  >
                    <div className="coprate-why-choose-div">
                      <Image
                        src={feature.image}
                        alt="Corporate Image"
                        className="coprate-why-choose-img"
                      />
                    </div>
                  </div>
                  <div
                    className={`col-md-8 ${
                      index % 2 === 0
                        ? "order-md-2 order-2"
                        : "order-md-1 order-2"
                    }`}
                  >
                    <div className="coprate-why-choose-img-data">
                      <h5>
                        {feature.id}. {feature.title}
                      </h5>
                      {feature.points.map((point, i) => (
                        <div key={i}>
                          <h4>
                            <i className={`bi ${point.icon}`}></i> {point.title}
                          </h4>
                          <p>{point.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="coprate-page-count-content">
          <h1 className="coprate-page-count-title">
            Bulk Business{" "}
            <span style={{ color: "var(--blue)" }}> Listing </span>
            Benefits
          </h1>
        </div>
        <BulkSms />
      </section>

      <section className="coprate-category-section">
        <div className="container">
          <div className="coprate-page-count-content">
            <h1 className="coprate-page-count-title">
              Industries<span style={{ color: "var(--blue)" }}> We </span>Serve
            </h1>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            className="coprate-category-swiper"
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <Link href={card.link} className="text-decoration-none">
                  <div className="coprate-category-card">
                    <Image
                      src={card.image}
                      alt={card.title}
                      priority
                      className="coprate-category-card-image"
                    />
                    <div className="card-body pt-2">
                      <h5 className="coprate-category-card-title">
                        {card.title}
                      </h5>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section>
        <div className="coprate-page-count-content">
          <h1 className="coprate-page-count-title">
            How<span style={{ color: "var(--blue)" }}> It </span>Works
          </h1>
        </div>
        <RoadMap />
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="coprate-page-count-content">
                <h1 className="coprate-page-count-title">
                  Get Started{" "}
                  <span style={{ color: "var(--blue)" }}> Today </span>
                  with Bizi<span style={{ color: "var(--blue)" }}>ff</span>
                  y.com!
                </h1>
              </div>
              <div className="coprate-form-btn">
                <button className="login-btn mb-3" onClick={handleFormToggle}>
                  {showForm ? "Hide Form" : "Get Started Now"}{" "}
                  <i className="bi bi-arrow-right-circle"></i>
                </button>
              </div>

              {showForm && (
                <div className="card p-4 mb-4">
                  <h4 className="mb-3">Corporate Advertise</h4>
                  <form>
                    <div className="mb-3">
                      <label>Choose Box:</label>
                      <select className="form-select">
                        <option>Advertisement</option>
                        <option>Bulk Listing</option>
                      </select>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          className="login-input"
                          placeholder="First Name"
                        />
                      </div>

                      <div className="col-md-6 mb-3">
                        <input
                          type="text"
                          className="login-input"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <input
                          type="text"
                          className="login-input"
                          placeholder="Business Name"
                        />
                      </div>

                      <div className="mb-3 col-md-6">
                        <input
                          type="text"
                          className="login-input"
                          placeholder="Brand Name"
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <input
                          type="text"
                          className="login-input"
                          placeholder="Phone Number"
                        />
                      </div>

                      <div className="mb-3 col-md-6">
                        <input
                          type="email"
                          className="login-input"
                          placeholder="Email"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label>Upload File</label>
                      <input type="file" className="login-input" />
                    </div>

                    <div className="mb-3">
                      <textarea
                        className="login-input"
                        rows="4"
                        placeholder="Type your message"
                      ></textarea>
                    </div>

                    {/* <div className="mb-3">
                      <input
                        type="text"
                        className="login-input"
                        placeholder="Enter Captcha"
                      />
                    </div> */}
                    <div className="coprate-form-btn">
                      <button type="submit" className="login-btn">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Page;
