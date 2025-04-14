"use client";
import { useState } from "react";
import React from "react";
import "../../Pages/bussiness-listing/businessListing.css";
import gourav from "../../Images/gourav.jpg";
import gourav2 from "../../Images/gourav2.jpg";
import gourav3 from "../../Images/gourav3.jpg";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay } from "swiper/modules";

const BusinessSimilarListing = () => {
  const similarlistingbusinesses = [
    {
      id: 1,
      name: "Pasricha Clinic",
      rating: 3.6,
      reviews: 5,
      phone: "+91 9810000000",
      image: gourav,
    },
    {
      id: 2,
      name: "The Holistic Clinic",
      rating: 5.0,
      reviews: 86,
      phone: "+91 9810000122",
      image: gourav2,
    },
    {
      id: 3,
      name: "Sharva Clinic",
      rating: 5.0,
      reviews: 75,
      phone: "+91 981004598",
      image: gourav3,
    },
    {
      id: 4,
      name: "vishnu sahu",
      rating: 5.0,
      reviews: 75,
      phone: "+91 981004598",
      image: gourav3,
    },
    {
      id: 5,
      name: "mukesh mehar",
      rating: 5.0,
      reviews: 75,
      phone: "+91 981004598",
      image: gourav3,
    },
    {
      id: 6,
      name: "akash singh",
      rating: 5.0,
      reviews: 75,
      phone: "+91 981004598",
      image: gourav3,
    },
    {
      id: 7,
      name: "aman tiwari",
      rating: 5.0,
      reviews: 75,
      phone: "+91 981004598",
      image: gourav3,
    },
    {
      id: 8,
      name: "nitin rajroiya",
      rating: 5.0,
      reviews: 75,
      phone: "+91 981004598",
      image: gourav,
    },
    {
      id: 9,
      name: "nikunj sharma",
      rating: 5.0,
      reviews: 75,
      phone: "+91 981004598",
      image: gourav3,
    },
    {
      id: 10,
      name: "deepak pandit",
      rating: 5.0,
      reviews: 75,
      phone: "+91 981004598",
      image: gourav3,
    },
    {
      id: 11,
      name: "deepak pandit",
      rating: 5.0,
      reviews: 75,
      phone: "+91 981004598",
      image: gourav3,
    },
    {
      id: 12,
      name: "deepak pandit",
      rating: 5.0,
      reviews: 75,
      phone: "+91 981004598",
      image: gourav3,
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <h3 className="text-center fw-bold text-dark">Similar Listings</h3>
          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={2}
            navigation
            autoplay={{ delay: 2000 }}
            breakpoints={{
              320: { slidesPerView: 1 },
              576: { slidesPerView: 1 },
              992: { slidesPerView: 2 },
            }}
          >
            {similarlistingbusinesses.map((similarbusinesses) => (
              <SwiperSlide key={similarbusinesses.id}>
                <Link
                  className="text-decoration-none"
                  href={`/Pages/bussiness-listing/${similarbusinesses.id}`}
                >
                  <div className="business-card">
                    <div>
                      <Image
                        src={similarbusinesses.image}
                        alt={similarbusinesses.name}
                        className="listing-image"
                      />
                    </div>
                    <div>
                      <div className="d-flex gap-3 mb-2 align-items-center">
                        <h5>{similarbusinesses.name.slice(0, 15)}...</h5>
                      </div>

                      <div className="d-flex gap-2 align-items-center">
                        <p>
                          {similarbusinesses.rating}{" "}
                          <i className="bi bi-star-fill"></i>{" "}
                          <i className="bi bi-star-fill"></i>{" "}
                          <i className="bi bi-star-fill"></i>{" "}
                          <i className="bi bi-star-fill"></i>{" "}
                          <i className="bi bi-star-fill"></i>{" "}
                          {similarbusinesses.reviews}
                        </p>
                        <span>|</span>
                        <p>Web Designer</p>
                      </div>

                      <div className="d-flex gap-2 align-items-center">
                        <p>7 years in business</p>
                        <span>|</span>
                        <p>Karnal, Haryana</p>
                      </div>

                      <div className="d-flex gap-2 align-items-center">
                        <div className="opening-hours-container">
                          <p className={`status ${isOpen ? "open" : "closed"}`}>
                            {isOpen ? "Open Now" : "Closed Now"}
                          </p>
                        </div>
                        <span>|</span>
                        <p>Phone: {similarbusinesses.phone}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default BusinessSimilarListing;
