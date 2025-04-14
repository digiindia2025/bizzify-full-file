"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Heading from "../../Components/Heading/SecHeading";
import blogImage1 from "../../Images/blog1.jpg";
import blogImage2 from "../../Images/blog2.jpg";
import blogImage3 from "../../Images/blog3.jpg";
import blogImage4 from "../../Images/blog4.jpg";
import blogImage5 from "../../Images/blog5.jpg";
import Image from "next/image";
import "./blog.css";
import Link from "next/link";

const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Professional Photoshoot Services",
      description:
        "High-quality images enhance brand presence and credibility.",
      image: blogImage1,
    },
    {
      id: 2,
      title: "Website & App Development",
      description:
        "A well-developed platform improves user experience and customer retention.",
      image: blogImage2,
    },
    {
      id: 3,
      title: "Creative Designing Services",
      description:
        "Strong visuals make brands stand out and boost recognition.",
      image: blogImage3,
    },
    {
      id: 4,
      title: "Digital Marketing Solutions",
      description:
        "SEO and social media marketing increase brand awareness and sales.",
      image: blogImage4,
    },
    {
      id: 5,
      title: "Content Creation & Branding",
      description:
        "Engaging content builds trust and strengthens brand identity.",
      image: blogImage5,
    },
  ];

  return (
    <>
      <section className="blog-main">
        <div className="container">
          <Heading title="Blogs" subtitle="Here is our latest blogs" />
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {blogs.map((blog) => (
              <SwiperSlide key={blog.id}>
                <div className="blog-card card">
                  <Image
                    src={blog.image}
                    className="blog-card-img"
                    alt={blog.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <p className="card-text">{blog.description}</p>
                    <Link
                      href={`../../Pages/blog/[id]${blog.id}`}
                      className="login-btn"
                    >
                      Read More <i className="bi bi-arrow-right-circle"></i>
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="text-center mt-4">
            <Link href="/Pages/blog">
              <button className="login-btn">View All <i className="bi bi-eye"></i></button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
