"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import gourav from "../../Images/gourav.jpg";
import gourav2 from "../../Images/gourav2.jpg";
import gourav3 from "../../Images/gourav3.jpg";
import ads from "../../Images/ads.png";
import ads1 from "../../Images/ads1.jpg";
import "../../Pages/bussiness-listing/businessListing.css";
import BusinessSimilarListing from "./BusinessSimilarListing";
import DealOffers from "./DealOffers";
import ListingPageFaq from "./ListingPageFaq";

const Businesslistingdetails = () => {
  const businesses = [
    {
      id: 1,
      name: "Pasricha Clinic",
      rating: 3.4,
      reviews: 5,
      address: "Shop 20, C S C II, Sector XIII, Rohini, Delhi",
      phone: "+91 9810000000",
      description: "Very polite and extremely knowledgeable doctor.",
      image: gourav,
      services: ["General Check-up", "Vaccination", "Health Consultation"],
      servicesArea: ["Delhi", "Gurgaon", "Noida"],
      reviewsData: [
        {
          author: "John Doe",
          comment: "Excellent service and very polite staff.",
        },
        {
          author: "Jane Smith",
          comment: "The doctor is very knowledgeable and kind.",
        },
      ],
    },
  ];

  // Text Constants
  const fullText =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium error, odio eos, nostrum animi quae facilis possimus consequatur id ipsum odit iure hic, debitis voluptas iusto eligendi tenetur nam omnis blanditiis quos magni porro? Dolore nostrum voluptatem dolorem natus totam tempore cum distinctio ea excepturi. Consectetur enim dolor ut ea dicta mollitia provident possimus placeat consequatur ab quasi neque laudantium recusandae aliquid nobis sapiente illum eum est reiciendis, rerum perspiciatis, corporis exercitationem. In voluptatum dignissimos quibusdam asperiores exercitationem nobis perferendis voluptate magnam alias beatae accusamus non reprehenderit adipisci placeat ex consequatur, unde eaque enim consequuntur debitis molestiae saepe officiis aut!";
  const words = fullText.split(" ");
  const wordLimit = 25;
  const isLongText = words.length > wordLimit;

  // Static Data
  const staticPhotos = [gourav, gourav2, gourav3, gourav, gourav2, gourav3];
  const hours = [
    { day: "Monday", open: "09:00 AM", close: "10:00 AM" },
    { day: "Tuesday", open: "09:00 AM", close: "07:00 PM" },
    { day: "Wednesday", open: "09:00 AM", close: "07:00 PM" },
    { day: "Thursday", open: "09:00 AM", close: "07:00 PM" },
    { day: "Friday", open: "09:00 AM", close: "07:00 PM" },
    { day: "Saturday", open: "10:00 AM", close: "05:00 PM" },
    { day: "Sunday", open: "Closed", close: "Closed" },
  ];

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(businesses[0]);
  const [reviews, setReviews] = useState(businesses[0].reviewsData || []);
  const [newReview, setNewReview] = useState({
    author: "",
    comment: "",
    rating: 0,
  });
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAllHours, setShowAllHours] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Derived Values
  const visiblePhotos = showAll ? staticPhotos : staticPhotos.slice(0, 4);

  // Functions
  const toggleText = () => {
    setExpanded(!expanded);
  };

  const handleAddReview = () => {
    if (newReview.author && newReview.comment) {
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews); // Update state
      setNewReview({ author: "", comment: "", rating: 0 }); // Clear form
      setShowForm(false); // Optionally close form
    }
  };

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightbox(true);
  };

  const closeLightbox = (event) => {
    if (
      event.target.classList.contains("lightbox-overlay") ||
      event.target.classList.contains("close-btn")
    ) {
      setLightbox(false);
    }
  };

  const getCurrentDay = () => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1; // Adjust for Sunday (0 = Sunday, so move it to index 6)
  };

  const isCurrentlyOpen = (openTime, closeTime) => {
    if (openTime === "Closed") return false;

    const now = new Date();
    const current = now.getHours() * 60 + now.getMinutes();

    const [openHours, openMinutes, openPeriod] = openTime.split(/[: ]/);
    const [closeHours, closeMinutes, closePeriod] = closeTime.split(/[: ]/);

    const open =
      ((parseInt(openHours) % 12) + (openPeriod === "PM" ? 12 : 0)) * 60 +
      parseInt(openMinutes);

    const close =
      ((parseInt(closeHours) % 12) + (closePeriod === "PM" ? 12 : 0)) * 60 +
      parseInt(closeMinutes);

    return current >= open && current <= close;
  };

  // Effects
  useEffect(() => {
    const today = getCurrentDay();
    const { open, close } = hours[today];
    setIsOpen(isCurrentlyOpen(open, close));
  }, []);

  // Get current day index for display
  const today = getCurrentDay();

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <Link href="/Pages/bussiness-listing">
            <button className="black-btn px-4">
              <i className="bi bi-arrow-left-short"></i> Back
            </button>
          </Link>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="details-card">
              <h5 className="m-0">dummy</h5>
              <div className="d-flex gap-2 align-items-center mb-1">
                <p>
                  dummy <i className="bi bi-star-fill"></i>{" "}
                  <i className="bi bi-star-fill"></i>{" "}
                  <i className="bi bi-star-fill"></i>{" "}
                  <i className="bi bi-star-fill"></i>{" "}
                  <i className="bi bi-star-fill"></i> dummy
                </p>
                <span>|</span>
                <p>Web Designer</p>
              </div>
              <Image
                src={gourav2}
                alt="Business Image"
                className="business-detail-image mb-3"
              />
              <div className="d-flex justify-content-center flex-wrap mb-2 gap-2">
                <Link href={"#"} className="business-listing-black-btn">
                  <i className="bi bi-crosshair"></i> Direction
                </Link>
                <Link href={"#"} className="business-listing-black-btn">
                  <i className="bi bi-share"></i> Share
                </Link>
                <Link href={"#"} className="business-listing-black-btn">
                  <i className="bi bi-telephone-outbound"></i> Contact
                </Link>
                <Link href={"#"} className="business-listing-black-btn">
                  <i className="bi bi-globe"></i> Website
                </Link>
                <Link href={"#"} className="business-listing-black-btn">
                  <i className="bi bi-whatsapp"></i> Whatsapp
                </Link>
              </div>
              <div className="d-flex gap-2 align-items-center mb-1">
                <p>7 years in business</p>
                <span>|</span>
                <p>Karnal, Haryana</p>
              </div>
              {/* End of copied data */}
              <ul className="nav nav-tabs mt-">
                <li className="nav-item">
                  <button
                    className={`nav-link listing-tabs-btn ${activeTab === "overview" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "service" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("service")}
                  >
                    Service
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "review" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("review")}
                  >
                    Review
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "photos" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("photos")}
                  >
                    Photos
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === "social" ? "active" : ""
                      }`}
                    onClick={() => setActiveTab("social")}
                  >
                    Social Media
                  </button>
                </li>
              </ul>

              <div className="tab-content mt-3">
                <div
                  className={`tab-pane fade ${activeTab === "overview" ? "show active" : ""
                    }`}
                >
                  <div>
                    <p>
                      <b>About Us:</b>
                      {expanded
                        ? fullText
                        : words.slice(0, wordLimit).join(" ") +
                        (isLongText ? "..." : "")}
                      {isLongText && (
                        <button
                          onClick={toggleText}
                          style={{
                            border: "none",
                            background: "none",
                            color: "blue",
                            cursor: "pointer",
                          }}
                        >
                          {expanded ? "Read Less" : "Read More"}{" "}
                          <i className="bi bi-arrow-right-circle"></i>
                        </button>
                      )}
                    </p>
                  </div>

                  <hr />

                  <div>
                    <p>
                      <b>Address : </b> Digi India Solution Rohini Sec 24
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <div className="opening-hours-container">
                      <p
                        onClick={() => setShowAllHours(!showAllHours)}
                        className={`status ${isOpen ? "open" : "closed"}`}
                      >
                        <b className="text-dark">Hours : </b>{" "}
                        {isOpen ? "Open" : "Closed"}{" "}
                        <i className="bi bi-chevron-down"></i>
                      </p>
                      {showAllHours && (
                        <ul className="opening-hours-list">
                          {hours.map((item, index) => (
                            <li
                              key={index}
                              className={today === index ? "today" : ""}
                            >
                              <span>{item.day}</span>
                              <span>
                                {item.open} - {item.close}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div>
                    <p>
                      <b>Phone: </b> {businesses[0].phone}
                    </p>
                  </div>
                  <hr />
                  <div className="tab-pane">
                    <p>
                      <b>Services</b>
                    </p>
                    <ul className="service-list list-unstyled">
                      {businesses[0].services?.map((service, index) => (
                        <li key={index}>
                          <i className="bi bi-check2-all me-2"></i>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr />
                  <div className="tab-pane">
                    <p>
                      <b>Servicing Area</b>
                    </p>
                    <div className="d-flex flex-wrap gap-2">
                      {businesses[0].servicesArea?.map(
                        (servicesArea, index) => (
                          <p key={index}>
                            {servicesArea}{" "}
                            {index !== servicesArea.length - 1 && (
                              <span className="mx-1 text-muted">|</span>
                            )}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="tab-pane">
                    <h4>Photos</h4>
                    <div className="photo-gallery d-flex flex-wrap gap-2">
                      {visiblePhotos.map((photo, index) => (
                        <Image
                          key={index}
                          src={photo}
                          alt={`Photo ${index + 1}`}
                          className="gallery-img"
                          onClick={() => openLightbox(index)}
                        />
                      ))}
                      {!showAll && staticPhotos.length > 4 && (
                        <div
                          className="plus-overlay"
                          onClick={() => setShowAll(true)}
                        >
                          +{staticPhotos.length - 4}
                        </div>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="tab-pane">
                    <ListingPageFaq />
                  </div>
                  <hr />
                  <div className="tab-pane">
                    <p>
                      <b>Rating Review</b>
                    </p>
                    <ul className="review-list">

                      {reviews.map((review, index) => (
                        <li key={index}>
                          <span className="review-name">
                            {typeof review.author === "string" &&
                              review.author.length > 0
                              ? review.author.charAt(0)
                              : "?"}
                          </span>
                          <div>
                            <div className="review-comment-star">
                              {[...Array(5)].map((_, i) => (
                                <i
                                  key={i}
                                  className={
                                    i < review.rating
                                      ? "bi bi-star-fill"
                                      : "bi bi-star"
                                  }
                                ></i>
                              ))}
                            </div>
                            <p className="client-feedback">
                              {`"${review.comment || ""}"`}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <hr />
                  <div className="tab-pane">
                    <h4>Social Media</h4>
                    <div className="socialmedia-details">
                      <div>
                        <div className="social-icons">
                          <Link href="#">
                            <i className="bi bi-twitter"></i>
                          </Link>
                          <Link href="#">
                            <i className="bi bi-facebook"></i>
                          </Link>
                          <Link href="#">
                            <i className="bi bi-linkedin"></i>
                          </Link>
                          <Link href="#">
                            <i className="bi bi-instagram"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "service" ? "show active" : ""
                    }`}
                >
                  <ul className="service-list list-unstyled">
                    {businesses[0].services?.map((service, index) => (
                      <li key={index}>
                        <i className="bi bi-check2-all me-2"></i>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={`tab-pane fade ${activeTab === "review" ? "show active" : ""
                    }`}
                >
                   <p>
                      <b>Review Rating</b>
                    </p>
                  <ul className="review-list">
                    {reviews.map((review, index) => (
                      <li key={index}>
                        <span className="review-name">
                          {typeof review.author === "string" &&
                            review.author.length > 0
                            ? review.author.charAt(0)
                            : "?"}
                        </span>
                        <div>
                          <div className="review-comment-star">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={
                                  i < review.rating
                                    ? "bi bi-star-fill"
                                    : "bi bi-star"
                                }
                              ></i>
                            ))}
                          </div>
                          <p className="client-feedback">
                            {`"${review.comment || ""}"`}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center">
                    <button
                      className="login-btn mb-2"
                      onClick={() => setShowForm(!showForm)}
                    >
                      {showForm ? "Hide Review Form" : "Write a Review"}{" "}
                      <i className="bi bi-pencil"></i>
                    </button>

                    {showForm && (
                      <div className="add-review">
                        <h4>Add a Review</h4>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="login-input mb-2"
                          value={newReview.author}
                          onChange={(e) =>
                            setNewReview({
                              ...newReview,
                              author: e.target.value,
                            })
                          }
                        />
                        <textarea
                          placeholder="Your Comment"
                          className="login-input mb-2"
                          value={newReview.comment}
                          onChange={(e) =>
                            setNewReview({
                              ...newReview,
                              comment: e.target.value,
                            })
                          }
                        ></textarea>
                        <div className="rating-selection">
                          <p>
                            <b>Select Rating:</b>
                          </p>
                          <div>
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={
                                  i < newReview.rating
                                    ? "bi bi-star-fill"
                                    : "bi bi-star"
                                }
                                onClick={() =>
                                  setNewReview({
                                    ...newReview,
                                    rating: i + 1,
                                  })
                                }
                                style={{ cursor: "pointer" }}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <button
                          className="btn btn-primary"
                          onClick={handleAddReview}
                        >
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`tab-pane fade ${activeTab === "photos" ? "show active" : ""
                    }`}
                >
                  <h4>Photos</h4>
                  <div className="photo-gallery d-flex flex-wrap gap-2">
                    {visiblePhotos.map((photo, index) => (
                      <Image
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="gallery-img"
                        onClick={() => openLightbox(index)}
                      />
                    ))}
                    {!showAll && staticPhotos.length > 4 && (
                      <div
                        className="plus-overlay"
                        onClick={() => setShowAll(true)}
                      >
                        +{staticPhotos.length - 4}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`tab-pane fade ${activeTab === "social" ? "show active" : ""
                    }`}
                >
                  <h4>Social Media</h4>
                  <div className="socialmedia-details">
                    <div>
                      <div className="social-icons">
                        <Link href="#">
                          <i className="bi bi-twitter"></i>
                        </Link>
                        <Link href="#">
                          <i className="bi bi-facebook"></i>
                        </Link>
                        <Link href="#">
                          <i className="bi bi-linkedin"></i>
                        </Link>
                        <Link href="#">
                          <i className="bi bi-instagram"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {lightbox && (
                  <div
                    className="lightbox-overlay fullscreen"
                    onClick={closeLightbox}
                  >
                    <button className="close-btn" onClick={closeLightbox}>
                      &times;
                    </button>
                    <Swiper
                      initialSlide={currentIndex}
                      navigation
                      keyboard={{ enabled: true }}
                      modules={[Navigation, Keyboard]}
                      className="lightbox-slider"
                      onSwiper={(swiper) => swiper.slideTo(currentIndex, 0)}
                    >
                      {staticPhotos.map((photo, index) => (
                        <SwiperSlide key={index}>
                          <div className="fullscreen-image-wrapper">
                            <Image
                              src={photo}
                              alt={`Slide ${index}`}
                              className="lightbox-img"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            {/* Enquiry Form */}
            <form className="enquiry-form">
              <div className="enquiry-heading d-flex align-items-center justify-content-center mb-3">
                <i className="bi bi-bell-fill enquiry-icon me-2"></i>
                <h5 className="mb-0">Enquiry Form</h5>
              </div>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className=" login-input"
                  placeholder="Enter your name"
                />
              </div>



              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className=" login-input"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">
                  What are you Looking for...
                </label>
                <input
                  type="text"
                  className=" login-input"
                  placeholder="Write you requirement"
                />
              </div>

              <button type="submit" className="btn bg-dark text-white w-100">
                Get Best Deal <i className="bi bi-chevron-double-right"></i>
              </button>
            </form>
            {/* add section  */}

            <section className="ads-section my-5">
              <div className="d-flex justify-content-center align-item-center">
                <Image src={ads} alt="ads" className="img-fluid" />
              </div>
            </section>
            <section className="ads-section my-5">
              <div className="d-flex justify-content-center align-item-center">
                <Image src={ads1} alt="ads" className="img-fluid" />
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="contain">
        <div className="row">
          <BusinessSimilarListing />
        </div>
        <hr />
        <div className="row">
          <DealOffers />
        </div>
      </div>
    </>
  );
};

export default Businesslistingdetails;
