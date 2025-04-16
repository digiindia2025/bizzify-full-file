import React from "react";
import "./subCategoryFilter.css";
import "../citytourismGuide/citytourismGuide.css";
import breadbg from "../../Images/ResturantBanner.jpg";
import ChinessResturant from "../../Images/ChinessResturant.jpg";
import SouthIndiaFood from "../../Images/SouthIndiaFood.jpg";
import NorthIndiaFood from "../../Images/NorthIndiaFood.jpg";
import SweetsFoods from "../../Images/SweetsFoods.jpg";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

const page = () => {
  const Categorydata = [
    {
      image: ChinessResturant,
      title: "Chinese Foods",
      link: "/Pages/bussiness-listing",
    },
    {
      image: SouthIndiaFood,
      title: "South Indian Foods",
      link: "/Pages/bussiness-listing",
    },
    {
      image: NorthIndiaFood,
      title: "North Indian Foods",
      link: "/Pages/bussiness-listing",
    },
    {
      image: SweetsFoods,
      title: "Sweets & Beverage",
      link: "/Pages/bussiness-listing",
    },
  ];
  return (
    <>
      <Head>
        <title>Find Top Businesses by Category | Biziffy</title>
        <meta
          name="description"
          content="Explore local businesses by category on Biziffy. Filter top-rated services like restaurants, salons, plumbers, electricians, and more near you."
        />
        <meta
          name="keywords"
          content="business category filter, local services, list by category, find restaurants, find electricians, plumber listing, category based search, Biziffy filter, top businesses in India, local SEO categories, business listing platform, nearby services, top rated businesses, business finder, categorized services, home repair services, beauty salons, AC repair, online business directory, SEO for service businesses, location based search, best plumbers, electricians in Delhi, best digital marketing agencies, categorized leads, find professionals online, discover local businesses"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Category Based Business Search | Biziffy"
        />
        <meta
          property="og:description"
          content="Search and filter local businesses by category. Discover top-rated professionals and grow your business with Biziffy."
        />
        <meta property="og:url" content="https://biziffy.com/category-filter" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Biziffy" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Find Businesses by Category on Biziffy"
        />
        <meta
          name="twitter:description"
          content="Easily discover services by category like plumbing, AC repair, beauty, electricians, and more with Biziffy."
        />
        <meta name="twitter:creator" content="@biziffy" />
      </Head>

      <section>
        <div className="all-breadcrumb">
          <Image
            src={breadbg}
            alt="Breadcrumb Background"
            layout="fill"
            objectFit="cover"
          />
          <div className="city-bread-overlay"></div>
          <div className="container">
            <div className="bread-content">
              <h1>Crazy Delicious Awaits. Are You Ready?</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="citys-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="citys-section-head">
                <h1 className="citys-section-heading">
                  What are you looking for?
                </h1>
              </div>
            </div>
            {Categorydata.map((category, index) => (
              <div key={index} className="col-md-3 col-sm-4 col-6">
                <div className="city-category-select-data">
                  <Link href={category.link}>
                    <div className="subcategory-filter-img">
                      <Image src={category.image} alt={category.title} />
                    </div>
                  </Link>

                  <h4 className="subcategory-filter-title">{category.title}</h4>
                </div>
              </div>
            ))}
            <div className="text-center mt-4">
              <button className="btn btn-primary" type="submit">
                View All Categories
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
