"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./TrustPilot.css";
import Link from "next/link";
import Image from "next/image";
import Choice1 from "../../Images/Choice1.png";
import Choice2 from "../../Images/Choice2.png";
import Choice3 from "../../Images/Choice3.png";
import Choice4 from "../../Images/Choice4.png";
import Heading from "../Heading/SecHeading";

const TrustPilot = () => {
  return (

    <>
      <section>
        <Heading title="Millions User Trust" subtitle="Customer Reviews" />
        <div className="container">
          <div className="trustpilot-section">
            <div className="row align-items-center">
              {/* Left Content */}
              <div className="col-lg-6 mb-4 mb-lg-0">
                <div className="content-wrapper">
                  <h1 className="display-5 fw-bold mb-3 TrustHeading">
                    Help millions make the right choice
                  </h1>
                  <p className="lead text-dark mb-4">
                    Share your experience on Trustpilot, where real reviews make a
                    difference.
                  </p>
                  <div className="d-flex  login-function align-items-center flex-wrap">
                    <Link href="/Pages/login">
                      <button className="btn btn-dark rounded-pill px-4 py-2 me-3">
                        SignIn / SignUp
                      </button>
                    </Link>

                    {/* <div className="social-login login-function d-flex">
                      <Link href="#" className="social-icon google me-2">
                        <i className="bi bi-google"></i>
                      </Link>
                      <Link href="#" className="social-icon facebook me-2">
                        <i className="bi bi-facebook"></i>
                      </Link>
                      <Link href="#" className="social-icon apple">
                        <i className="bi bi-apple"></i>
                      </Link>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Right Swiper Slider */}
              <div className="col-lg-3 col-6">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  direction="vertical" // This makes the slider move from bottom to top
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  loop={true}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  className="trustpilot-swiper"
                >
                  <SwiperSlide>
                    <Image
                      src={Choice1}
                      className="d-block rounded-4"
                      alt="Trustpilot review"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src={Choice2}
                      className="d-block rounded-4"
                      alt="Trustpilot review"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src={Choice3}
                      className="d-block rounded-4"
                      alt="Trustpilot review"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
              <div className="col-lg-3 col-6">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  direction="vertical" // This makes the slider move from bottom to top
                  spaceBetween={30}
                  slidesPerView={1}
                  navigation
                  loop={true}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  className="trustpilot-swiper"
                >
                  <SwiperSlide>
                    <Image
                      src={Choice4}
                      className="d-block rounded-4"
                      alt="Trustpilot review"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src={Choice3}
                      className="d-block rounded-4"
                      alt="Trustpilot review"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Image
                      src={Choice1}
                      className="d-block rounded-4"
                      alt="Trustpilot review"
                    />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
};

export default TrustPilot;
